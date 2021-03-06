import easyinvoice from 'easyinvoice'
import { MDBDataTable } from 'mdbreact'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from 'store/actions/bookingAction'
import { Booking } from 'types/booking'

export type Rows = {
  id: string
  checkIn?: string
  checkOut?: string
  amount?: string
  actions: React.ReactNode
  name?: string
  price?: string
  category?: 'King' | 'Single' | 'Twins'
  rating?: number
  comment?: string
  user?: string
  email?: string
  role?: string
}[]

type Props = {
  bookings: {
    bookings: [Booking]
    error: Error
    loading: boolean
  }
}

const MyBookings = () => {
  const dispatch = useDispatch()

  const { bookings, error } = useSelector((state: Props) => state.bookings)

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearErrors())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const setBookings = () => {
    const data = {
      columns: [
        {
          label: 'Booking ID',
          field: 'id',
          sort: 'asc'
        },
        {
          label: 'Check In',
          field: 'checkIn',
          sort: 'asc'
        },
        {
          label: 'Check Out',
          field: 'checkOut',
          sort: 'asc'
        },
        {
          label: 'Amount Paid',
          field: 'amount',
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

    bookings &&
      bookings.forEach((booking: Booking) => {
        data.rows.push({
          id: booking._id,
          checkIn: new Date(booking.checkInDate).toLocaleString('en-US'),
          checkOut: new Date(booking.checkOutDate).toLocaleString('en-US'),
          amount: `$${booking.amountPaid}`,
          actions: (
            <>
              <Link href={`/bookings/${booking._id}`}>
                <a className="btn btn-primary">
                  <i className="fa fa-eye"></i>
                </a>
              </Link>

              <button
                className="btn btn-success mx-2"
                onClick={() => downloadInvoice(booking)}
              >
                <i className="fa fa-download"></i>
              </button>
            </>
          )
        })
      })

    return data
  }

  const downloadInvoice = async (booking: Booking) => {
    const data = {
      documentTitle: 'Booking INVOICE', //Defaults to INVOICE
      currency: 'USD',
      taxNotation: 'vat', //or gst
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      logo: 'https://res.cloudinary.com/bookit/image/upload/v1617904918/bookit/bookit_logo_cbgjzv.png',
      sender: {
        company: 'Book IT',
        address: '13th Street. 47 W 13th St',
        zip: '10001',
        city: 'New York',
        country: 'United States'
      },
      client: {
        company: `${booking.user.name}`,
        address: `${booking.user.email}`,
        zip: '',
        city: `Check In: ${new Date(booking.checkInDate).toLocaleString(
          'en-US'
        )}`,
        country: `Check In: ${new Date(booking.checkOutDate).toLocaleString(
          'en-US'
        )}`
      },
      invoiceNumber: `${booking._id}`,
      invoiceDate: `${new Date(Date.now()).toLocaleString('en-US')}`,
      products: [
        {
          quantity: `${booking.daysOfStay}`,
          description: `${booking.room.name}`,
          tax: 0,
          price: booking.room.price
        }
      ],
      bottomNotice: 'This is auto generated Invoice of your booking on Book IT.'
    }

    const result = await easyinvoice.createInvoice(data)
    easyinvoice.download(`invoice_${booking._id}.pdf`, result.pdf)
  }

  return (
    <div className="container container-fluid">
      <h1 className="my-5">My Bookings</h1>

      <MDBDataTable
        data={setBookings()}
        className="px-3"
        bordered
        striped
        hover
      />
    </div>
  )
}

export default MyBookings
