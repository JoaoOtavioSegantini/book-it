import { Room } from 'types/room'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-bootstrap'
import { Features } from '@components'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { clearErrors } from 'store/actions/roomActions'

type Props = {
  roomDetails: {
    room: Room
    error: Error
  }
}

const RoomDetails = () => {
  const { room, error } = useSelector((state) => (state as Props).roomDetails)
  const dispatch = useDispatch()

  useEffect(() => {
    toast.error(error)
    dispatch(clearErrors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <Head>
        <title>{room.name} - BookIT</title>
      </Head>
      <div className="container container-fluid">
        <h2 className="mt-5">{room.name}</h2>
        <p>{room.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(room.ratings / 5) * 100}%` }}
            ></div>
          </div>
          <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
        </div>
        <Carousel>
          {room.images &&
            room.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <div style={{ width: '100%', height: '440px' }}>
                  <Image
                    src={image.url}
                    alt={room.name}
                    className="d-block m-auto"
                    layout="fill"
                  />
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
        <Features room={room} />
        <div className="reviews w-75">
          <h3>Reviews:</h3>
          <hr />
          <div className="review-card my-3">
            <div className="rating-outer">
              <div className="rating-inner"></div>
              <p className="review_user">by John</p>
              <p className="review_comment">Good Quality</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RoomDetails
