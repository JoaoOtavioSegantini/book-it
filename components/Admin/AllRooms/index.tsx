import { Loader } from '@components'
import { Rows } from '@components/booking/MyBooking'
import { MDBDataTable } from 'mdbreact'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  clearErrors,
  deleteRoom,
  getAdminRooms
} from 'store/actions/roomActions'
import { DELETE_ROOM_RESET } from 'store/constants/roomContants'
import { Room } from 'types/room'

type Props = {
  allRooms: {
    rooms: [Room]
    error: Error
    loading: boolean
  }
}

type RoomProps = {
  room: {
    error: Error
    loading: boolean
    isDeleted: boolean
  }
}

const AllRooms = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { loading, error, rooms } = useSelector(
    (state: Props) => state.allRooms
  )
  const { error: deleteError, isDeleted } = useSelector(
    (state: RoomProps) => state.room
  )

  useEffect(() => {
    dispatch(getAdminRooms())

    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }

    if (deleteError) {
      toast.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      router.push('/admin/rooms')
      dispatch({ type: DELETE_ROOM_RESET })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, deleteError, isDeleted])

  const setRooms = () => {
    const data = {
      columns: [
        {
          label: 'Room ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc'
        },
        {
          label: 'Price / Night',
          field: 'price',
          sort: 'asc'
        },
        {
          label: 'Category',
          field: 'category',
          sort: 'asc'
        },
        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc'
        }
      ],
      rows: [] as Rows
    }

    rooms &&
      rooms.forEach((room: Room) => {
        data.rows.push({
          id: room._id,
          name: room.name,
          price: `$${room.price}`,
          category: room.category,
          actions: (
            <>
              <Link href={`/admin/rooms/${room._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-pencil"></i>
                </a>
              </Link>

              <button
                className="btn btn-danger mx-2"
                onClick={() => deleteRoomHandler(room._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </>
          )
        })
      })

    return data
  }

  const deleteRoomHandler = (id: string) => {
    dispatch(deleteRoom(id))
  }

  return (
    <div className="container container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="my-5">
            {`${rooms && rooms.length} Rooms`}

            <Link href="/admin/rooms/new">
              <a className="mt-0 btn text-white float-right new-room-btn">
                Create Room
              </a>
            </Link>
          </h1>

          <MDBDataTable
            data={setRooms()}
            className="px-3"
            bordered
            striped
            hover
          />
        </>
      )}
    </div>
  )
}

export default AllRooms