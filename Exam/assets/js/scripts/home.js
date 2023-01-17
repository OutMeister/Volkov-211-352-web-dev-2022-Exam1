let routesListRef = document.getElementById("routes-list");

const API_BASE_URL = 'http://exam-2023-1-api.std-900.ist.mospolytech.ru/api';
const API_KEY = 'd2593498-dbcb-476b-8999-12862b300a4f';
const API_KEY_PARAMS = `?api_key=${API_KEY}`;
const guidsRowRef = document.getElementById('guids-row');
const guidsTitleRef = document.getElementById('guids-title');
const guidsListRef = document.getElementById('guids-list');

var currentGuid = null;
const guidsTable = new gridjs.Grid({
  pagination: {
    limit: 5
  },
  sort: !0,
  search: !0,
  data: []
});
guidsTable.render(guidsListRef);
const makeRequestRef = document.getElementById('make-request');
makeRequestRef.style.display = 'none';

async function postData(url, data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow',
    referrerPolicy: 'origin',
    body: JSON.stringify(data)
  });
  return response.json();
}

var currentRoute = null;

async function getRoutes() {
  let response = await fetch(API_BASE_URL + '/routes' + API_KEY_PARAMS);
  let result = await response.json();
  return result;
}

async function renderRoutes() {
  let routes = await getRoutes();

  const routesTable = new gridjs.Grid({
    columns: [{
      name: "Название"
    }, {
      name: "Описание"
    }, {
      name: "Основные объекты"
    },      
    {   
      name: 'Действие',
      formatter: (cell, row) => {
        return gridjs.h('button', {
          className: 'btn btn-outline-primary waves-effect waves-light',
          onClick: () => {
            currentRoute = routes.find((route) => route.id === cell);
            onRouteChange(cell, row.cells.map((item) => item.data));
          }
        }, 'Выбрать');
      }
    }],
    pagination: {
      limit: 5
    },
    sort: !0,
    search: !0,
    data: routes.map((route) => ([
      route.name,
      route.description,
      route.mainObject,
      route.id
    ]))
  });

  routesTable.render(routesListRef);
}

async function getGuids(routeId) {
  let response = await fetch(API_BASE_URL + `/routes/${routeId}/guides` + API_KEY_PARAMS);
  let result = await response.json();
  return result;
}

function showGuids() {
  guidsRowRef.style.display = 'block';
}

function hideGuids() {
  guidsRowRef.style.display = 'none';
}

function updateGuidTitle(guidName) {
  guidsTitleRef.innerText = `Список гидов по маршруту "${guidName}"`;
}

async function onRouteChange(guidId, guidRow) {
  updateGuidTitle(guidRow[0]);
  await renderGuids();

  currentGuid = null;
  makeRequestRef.style.display = 'none';
}

async function onGuidChange() {
  const modalGuidNameRef = document.querySelector('#modal-guid-name span');
  const modalRouteNameRef = document.querySelector('#modal-route-name span');

  modalGuidNameRef.innerHTML = currentGuid.name;
  modalRouteNameRef.innerHTML = currentRoute.name;

  makeRequestRef.style.display = 'block';
}

async function renderGuids() {
  if (currentRoute) {
    showGuids();
    
    let guids = await getGuids(currentRoute.id);

    guidsTable.updateConfig({
      columns: [{
        name: "ФИО"
      }, {
        name: "Языки"
      }, {
        name: "Опыт работы"
      },      
      {   
        name: 'Стоимость услуги (в час)'
      },
      {   
        name: 'Действие',
        formatter: (cell, row) => {
          return gridjs.h('button', {
            className: 'btn btn-outline-primary waves-effect waves-light',
            onClick: () => {
              currentGuid = guids.find((guid) => guid.id === cell);
              onGuidChange(cell);
            }
          }, 'Выбрать');
        }
      }],
      data: guids.map((guid) => ([
        guid.name,
        guid.language,
        `${guid.workExperience} лет`,
        guid.pricePerHour,
        guid.id
      ]))
    }).forceRender();
  }
}

async function updateTableData() {
  renderRoutes();
}

hideGuids();
updateTableData();