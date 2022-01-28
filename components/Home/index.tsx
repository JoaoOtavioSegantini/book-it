import React, { useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { RoomItem } from '@components'
import { Room } from 'types/room'
import { toast } from 'react-toastify'
import { clearErrors } from 'store/actions/roomActions'
import Pagination from 'react-js-pagination'
import { useRouter } from 'next/router'

export type State = {
  allRooms: {
    rooms: [Room]
    error: Error
    resPerPage: number
    roomsCount: number
    filteredRoomsCount: number
  }
}

const Home = () => {
  const { rooms, error, resPerPage, roomsCount, filteredRoomsCount } =
    useSelector((state) => (state as State).allRooms)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    toast.error(error)
    dispatch(clearErrors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // eslint-disable-next-line prefer-const
  let { location, page = 1 } = router.query
  page = Number(page)

  const handlePagination = (pageNumber: number) => {
    if (location) {
      let url = window.location.search

      url.includes('&page')
        ? (url = url.replace(/(page=)[^&]+/, '$1' + pageNumber))
        : (url = url.concat(`&page=${pageNumber}`))

      router.push(url)
    } else {
      router.push(`/?page=${pageNumber}`)
      // window.location.href = `/?page=${pageNumber}`
    }
  }

  let count = roomsCount
  if (location) {
    count = filteredRoomsCount
  }

  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">
          {location ? `Rooms in ${location}` : 'All Rooms'}
        </h2>

        <Link href="/search">
          <a className="ml-2 back-to-search">
            <i className="fa fa-arrow-left"></i> Back to Search
          </a>
        </Link>
        <div className="row">
          {rooms.map((room) => (
            <RoomItem key={room._id} room={room} />
          ))}
        </div>
      </section>

      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handlePagination}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  )
}

export default Home
