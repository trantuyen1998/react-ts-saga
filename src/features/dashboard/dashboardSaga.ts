
import cityApi from 'api/cityApi'
import studentApi from 'api/studentApi'
import { City, ListReponse, Student } from 'models'
import { takeLatest, all, call, put } from 'redux-saga/effects'
import { dashboardAction, RankingByCity } from './dashboardSlice'


function* fetchStatistics() {
    const responseList: Array<ListReponse<Student>> = yield all([
        call(studentApi.getAllStudent, { _page: 1, _limit: 1, gender: 'male' }),
        call(studentApi.getAllStudent, { _page: 1, _limit: 1, gender: 'female' }),
        call(studentApi.getAllStudent, { _page: 1, _limit: 1, mark_gte: 8 }),
        call(studentApi.getAllStudent, { _page: 1, _limit: 1, mark_lte: 5 }),
      ]);

    const statisticList = responseList.map(x => x.pagination._totalRows)
    const [maleCount, femaleCount, hightMarkCount, lowMarkCount] = statisticList
    yield put(dashboardAction.setStatistics({maleCount, femaleCount, hightMarkCount, lowMarkCount}))
}
function* fetchHighestStudentList() {
   const {data}: ListReponse<Student> = yield call(studentApi.getAllStudent, {
       _limit: 5,
       _page: 1,
       _sort:'mark',
       _order:'desc'
   })

   yield put(dashboardAction.setHighestStudentList(data))
}
function* fetchLowestStudentList() {
    const {data}: ListReponse<Student> = yield call(studentApi.getAllStudent, {
        _limit: 5,
        _page: 1,
        _sort:'mark',
        _order:'asc'
    })
 
    yield put(dashboardAction.setLowestStudentList(data))
}
function* fetchRankingByCityList() {
     // Fetch city list
  const { data: cityList }: ListReponse<City> = yield call(cityApi.getAllCity);

  // Fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAllStudent, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );
  const responseList: Array<ListReponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => ({
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data,
  }));

  // Update state
  yield put(dashboardAction.setRankingByCityList(rankingByCityList));
}
function* fetchDashboardData() {
   try {
      yield all([
          call(fetchStatistics),
          call(fetchHighestStudentList),
          call(fetchLowestStudentList),
          call(fetchRankingByCityList)
      ])
      yield put(dashboardAction.fetchDataSuccess())
   } catch (e) {
       yield put(dashboardAction.fetchDataFailed())
      console.log(`fetching dashboard failed ${e.message}`)
   }
}

export default function* dashboardSaga() {
   yield takeLatest(dashboardAction.fetchData.type, fetchDashboardData)
}