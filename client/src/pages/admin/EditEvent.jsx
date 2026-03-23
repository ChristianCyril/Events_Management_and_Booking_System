// pages/admin/EditEvent.jsx
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useApiPrivate from "../../hooks/useApiPrivate"
import MapPicker from "../../components/map/MapPicker"
import "./EventForm.css"
import AdminHeader from '../../components/headers/AdminHeader'
import Sidebar from '../../components/admin-sidebar/Sidebar'

const initialValues = {
  title: "",
  description: "",
  date: "",
  time: "",
  price: "",
  capacity: "",
  maxBookingsPerUser: ""
}


export default function EditEvent() {
  const { id } = useParams()
  const apiPrivate = useApiPrivate()
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(initialValues);
  const [location, setLocation] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Fetch existing event data and pre-fill the form
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiPrivate.get(`/admin/event/${id}`)
        const event = response.data

        // Pre-fill all form fields with existing data
        setFormValues({
          title: event.title,
          description: event.description,
          // Format date to YYYY-MM-DD for the date input
          date: new Date(event.date).toISOString().split("T")[0],
          time: event.time,
          price: event.price,
          capacity: event.capacity,
          maxBookingsPerUser: event.maxBookingsPerUser
        })

        // Pre-fill the map with existing location
        setLocation(event.location)

        // Show existing image as preview
        if (event.image?.url) {
          setImagePreview(event.image.url)
        }
      } catch (error) {
        setServerError("Failed to load event data")
      } finally {
        setFetching(false)
      }
    }

    fetchEvent()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const validate = (values) => {
    const errors = {}
    if (!values.title) errors.title = "Title is required"
    if (!values.description) errors.description = "Description is required"
    if (!values.date) errors.date = "Date is required"
    if (!values.time) errors.time = "Time is required"
    if (values.price === "") errors.price = "Price is required"
    if (values.capacity === "") errors.capacity = "Capacity is required"
    if (values.maxBookingsPerUser === "") errors.maxBookingsPerUser = "Max bookings per user is required"
    if (Number(values.maxBookingsPerUser) > Number(values.capacity)) {
      errors.maxBookingsPerUser = "Max bookings per user cannot exceed capacity"
    }
    if (!location) errors.location = "Please select a location on the map"
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError("")
    setFormErrors(validate(formValues))
    if (Object.keys(validate(formValues)).length > 0) return

    const formData = new FormData()
    formData.append("title", formValues.title)
    formData.append("description", formValues.description)
    formData.append("date", formValues.date)
    formData.append("time", formValues.time)
    formData.append("price", formValues.price)
    formData.append("capacity", formValues.capacity)
    formData.append("maxBookingsPerUser", formValues.maxBookingsPerUser)
    formData.append("location", JSON.stringify(location))
    if (imageFile) formData.append("image", imageFile)

    try {
      setLoading(true)
      await apiPrivate.put(`/admin/event/${id}`, formData);
      navigate("/dashboard")
    } catch (error) {
      setServerError(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <p>Loading event...</p>

  return (
    <>
      <AdminHeader />
      <Sidebar/>
      <div className="event-form-page">
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>Edit Event</h2>

          {serverError && <p className="server-error">{serverError}</p>}

          <div className="form-group">
            <label>Title</label>
            {formErrors.title && <p className="error-message">{formErrors.title}</p>}
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Event title"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            {formErrors.description && <p className="error-message">{formErrors.description}</p>}
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Event description"
              rows={4}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              {formErrors.date && <p className="error-message">{formErrors.date}</p>}
              <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              {formErrors.time && <p className="error-message">{formErrors.time}</p>}
              <input
                type="time"
                name="time"
                value={formValues.time}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price (FCFA)</label>
              {formErrors.price && <p className="error-message">{formErrors.price}</p>}
              <input
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              {formErrors.capacity && <p className="error-message">{formErrors.capacity}</p>}
              <input
                type="number"
                name="capacity"
                value={formValues.capacity}
                onChange={handleChange}
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Max Tickets Per User</label>
              {formErrors.maxBookingsPerUser && (
                <p className="error-message">{formErrors.maxBookingsPerUser}</p>
              )}
              <input
                type="number"
                name="maxBookingsPerUser"
                value={formValues.maxBookingsPerUser}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="image-preview"
              />
            )}
            {imagePreview && !imageFile && (
              <p className="current-image-note">Current image shown above. Upload a new one to replace it.</p>
            )}
          </div>
          <div className="form-group">
            <label>Location</label>
            {formErrors.location && <p className="error-message">{formErrors.location}</p>}
            <MapPicker
              location={location}
              setLocation={setLocation}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </>


  )
}