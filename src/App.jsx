import { useCallback, useEffect, useState } from 'react'
import { fetchData, setPage, setStatus, setCount, setUserCount } from './redux/reducer'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from './spinner'

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
  const users = useSelector(
    state =>
    state.status === 'all' ? state.items :
    state.items.filter(item => item.status === state.status)
  )

  const userCountNumber = useSelector(state => state.userCount)
  const currentCount = useSelector(state => state.count === 0 ? users.length : state.count )
  const currentPage = useSelector(state => state.currentPage)
  const statusArr = ['all', 'active', 'disable', 'pending'] 
  const countArr = [10, 20, 30, 50, 99] 
  const usersCount = useCallback([...Array(100 + 1).keys()], [])

  const handleSetPage = (page) => {
    dispatch(setPage(page))
    handleSetStatus('all')
  }

  const handleSetStatus = (status) => {
    dispatch(setStatus(status))
  }

  const handleSetCount = (count) => {
    dispatch(setCount(count))
  }

  const handleSetUserCount = (count) => {
    dispatch(setUserCount(count))
  }

  useEffect(() => {
    dispatch(fetchData(currentPage, currentCount, userCountNumber))
  }, [currentPage, currentCount, userCountNumber, dispatch])

  if (loading) {
    return (
      <div className='spinner'>
        <Spinner/>
      </div>
    )
  }

  return (
    <div className="App">
      <div className='users'>
        {users.map(item =>
            <div className='user' key={item.id}>
              {item.name}
            </div>
        )}
      </div>
      <div className='countWord'>
        Pages
      </div>
      <div className='pages'>{[...Array(6).keys()].slice(1).map((page, index) =>
        <button 
          onClick={() => handleSetPage(page, currentCount)} 
          key={index} 
          className='page'>
          {page}
        </button>
        )}
      </div>
      <div className='status'>
        <div className='status-first'>
          Status
        </div>
        <div className='statusArr'>
          {statusArr.map((status, index) =>
            <span onClick={() => handleSetStatus(status)} className='single-status' key={index}>
              {status}
            </span>
            )}
        </div>
      </div>
      <div className='count'>
        <div className='countWord'>
          Per page
        </div>
        <div className='countArr'>
          {countArr.map((count, index) =>
            <span
              key={index}
              className='single-count'
              onClick={() => handleSetCount(count)}
              >
              {count}
            </span>
            )}
        </div>
      </div>
      <div className='userCount'>
        <div className='countWord'>
          User count
        </div>
        <div className='userCount-arr'>
          {usersCount
            .slice((userCountNumber <= 5 ? 1 : userCountNumber - 5), (userCountNumber <= 5 ? 11 : userCountNumber + 5))
            .map((userCount, index) =>
            <span
              className={userCount === userCountNumber ? 'checked' : '' }
              key={index}
              onClick={() => handleSetUserCount(userCount)}>
              {userCount}
            </span>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
