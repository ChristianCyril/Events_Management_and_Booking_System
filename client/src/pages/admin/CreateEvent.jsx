// pages/admin/CreateEvent.jsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useApiPrivate from "../../hooks/useApiPrivate"
import MapPicker from "../../components/map/MapPicker"
import "./EventForm.css"
import AdminHeader from '../../components/headers/AdminHeader'
import Sidebar from '../../components/admin-sidebar/Sidebar'
import dayjs from 'dayjs'

const initialValues = {
  title: "",
  description: "",
  date: "",
  time: "",
  price: "",
  capacity: "",
  maxBookingsPerUser: "",
}

export default function CreateEvent() {
  const apiPrivate = useApiPrivate()
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState(initialValues)
  const [location, setLocation] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
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
    if (values.date < new Date()) errors.date = "You cannot create an event in the past"
    if (!values.time) errors.time = "Time is required"
    if (values.time < dayjs().format('HH:mm')) errors.time = "Time cannot be in the past"
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
    setFormErrors(validate(formValues));
    if (Object.keys(formErrors).length > 0) return

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
      await apiPrivate.post("/admin/event", formData);
      navigate("/dashboard")
    } catch (error) {
      setServerError(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AdminHeader />
      <Sidebar />
      <div className="event-form-page">
        <form className="event-form" onSubmit={handleSubmit}>
          <h2>Create Event</h2>

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
                placeholder="0"
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
                placeholder="Total seats"
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
                placeholder="Max per user"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Event Image (optional)</label>
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
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </>

  )
}