# 📍 Location-Based Search App

An interactive web app that lets users **search nearby places** using live location, **apply category filters**, and view detailed info including **Google Maps integration, user reviews**, and **shareable directions**. Built using **React**, **Leaflet.js**, and **Google Places API**.

---

## 🌟 Features

- 🧭 **Live Location Tracking**
  - Automatically fetches and uses user's current geolocation
  - Option to manually enter location if geolocation fails

- 🔍 **Category Filters**
  - Search by categories like:
    - Restaurants 🍽️
    - ATMs 🏧
    - Hospitals 🏥
    - Pharmacies 💊
    - Markets 🛒
    - Parks 🌳
    - Malls 🛍️
    - and more
  - Custom filter option for keywords

- 📌 **Custom Map Markers**
  - Dynamic map markers rendered using **Leaflet.js**
  - Icons vary based on place category
  - Markers are clickable for detailed info

- 📱 **Mobile Navigation Support**
  - Users can **generate a QR code** to open directions on mobile maps
  - Shareable links for each place

- 📄 **Place Details & Reviews**
  - Name, address, rating, reviews

- 🗺️ **Directions**
  - Click on "Get Directions" to open routes in Google Maps

---

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Maps**: Leaflet.js, Google Maps & Places API
- **Backend (Optional)**: Node.js + MongoDB (for registered businesses or storing analytics)
- **Others**: Axios, QR Code Generator, Geolocation API

---

## 🚀 How To Run Locally

```bash
# Clone the repository
git clone https://github.com/Vedant-Agrawal07/location-based-search-app.git
cd my-react-app

# Install dependencies
npm install

# Add your MapBox API key to .env
REACT_APP_MAPBOX_API_KEY=your_mapbox_api_key

# Run the development server
npm run dev

