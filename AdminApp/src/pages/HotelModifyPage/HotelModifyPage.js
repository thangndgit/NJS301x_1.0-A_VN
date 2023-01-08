import PageLayout from "../../layouts/PageLayout/PageLayout";
import Form from "../../layouts/FormLayout/FormLayout";
import "./HotelModifyPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../constants/api";

const HotelModifyPage = ({ mode }) => {
  // Navigate function
  const navigate = useNavigate();

  // Default hotel info
  const defaultHotel = {
    address: "",
    city: "",
    distance: 0,
    featured: false,
    name: "",
    photos: [],
    rating: Math.ceil(Math.random() * 10 + 40) / 10,
    rooms: [],
    type: "hotel",
  };

  const [formTitle, setFormTitle] = useState("Modify Hotel");
  const [submitText, setSubmitText] = useState("Save Hotel");
  const [hotel, setHotel] = useState(defaultHotel);

  // Get params
  const params = useParams();

  useEffect(() => {
    // If in edit mode
    if (mode === "edit") {
      // Set text
      setFormTitle("Edit Hotel");
      setSubmitText("Save Changes");
      // Get hotel to edit
      fetch(API.GET_HOTEL_BY_ID + "?hotelId=" + params.hotelId)
        // Convert response to json data
        .then((res) => res.json())
        // Apply data
        .then((data) => {
          if (data.type === "Success") setHotel(data.item);
          else alert(data.message);
        })
        // Catch error
        .catch((err) => console.log(err));
    }

    // If in add mode
    if (mode === "add") {
      // Set text
      setFormTitle("Add Hotel");
      setSubmitText("Add Hotel");
      setHotel(defaultHotel);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, params.hotelId]);

  // Handle when submit hotel form
  const handleSubmitForm = (e) => {
    // Prevent page reload
    e.preventDefault();

    // Set fetch url
    let fetchUrl = "";
    if (mode === "add") fetchUrl = API.POST_CREATE_HOTEL;
    if (mode === "edit") fetchUrl = API.POST_UPDATE_HOTEL_BY_ID;

    // Fetch
    fetch(fetchUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotel),
    })
      // Convert response to json
      .then((res) => res.json())
      // Process data
      .then((data) => {
        alert(data.message);
        if (data.type === "Success") navigate("/hotels");
      })
      // Catch error
      .catch((err) => console.log(err));
  };

  return (
    <PageLayout>
      <div className="hotel-modify-page">
        <Form title={formTitle} onSubmit={handleSubmitForm}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter the hotel name"
              value={hotel.name || ""}
              onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Type</label>
            <select
              value={hotel.type}
              onChange={(e) => setHotel({ ...hotel, type: e.target.value })}
              required
            >
              <option value="hotel">Hotel</option>
              <option value="apartment">Apartment</option>
              <option value="resort">Resort</option>
              <option value="villa">Villa</option>
              <option value="cabin">Cabin</option>
            </select>
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="Enter the city name of the hotel"
              value={hotel.city || ""}
              onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter the hotel address"
              value={hotel.address || ""}
              onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Distance From City Center</label>
            <input
              type="number"
              min={0}
              step={1}
              placeholder="Enter the distance from the hotel to the city center"
              value={hotel.distance || 0}
              onChange={(e) =>
                setHotel({ ...hotel, distance: Number(e.target.value) })
              }
              required
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter the hotel description"
              value={hotel.desc || ""}
              onChange={(e) => setHotel({ ...hotel, desc: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Images</label>
            <textarea
              placeholder="Enter the hotel images links (1 link per line)"
              rows={5}
              value={hotel.photos ? hotel.photos.join("\n") : ""}
              onChange={(e) =>
                setHotel({
                  ...hotel,
                  photos: e.target.value.replace(" ", "").split("\n"),
                })
              }
              required
            />
          </div>
          <div>
            <label>Featured</label>
            <select
              value={hotel.featured}
              onChange={(e) =>
                setHotel({ ...hotel, featured: Boolean(e.target.value) })
              }
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
            <button type="submit" style={{ marginTop: "15px" }}>
              {submitText}
            </button>
          </div>
        </Form>
      </div>
    </PageLayout>
  );
};

export default HotelModifyPage;
