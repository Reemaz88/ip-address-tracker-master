document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'at_6i7tUAPPTfRmrTWYw43AOp8zmHAEN'; 
  const defaultIPAddress = '192.212.174.101'; 

  var map = L.map('map').setView([0, 0], 1);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);
  var marker = L.marker([0, 0]).addTo(map);

  function fetchData(ipAddress) {
    fetch(
      `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const ipAddress = data.ip;
        const location = `${data.location.city}, ${data.location.region}, ${data.location.country} ${data.location.postalCode}`;
        const timezone = `UTC${data.location.timezone}`;
        const isp = data.isp;
        console.log('API response:', data);
        const outputContainer = document.getElementById('api-output');
        outputContainer.innerHTML = `
    <p><strong>IP ADDRESS:</strong> <span class="info">${ipAddress}</span></p>
    <p><strong>LOCATION:</strong> <span class="info">${location}</span></p>
    <p><strong>TIMEZONE:</strong> <span class="info">${timezone}</span></p>
    <p><strong>ISP:</strong> <span class="info">${isp}</span></p>
`;

        map.setView([data.location.lat, data.location.lng], 13);
        marker.setLatLng([data.location.lat, data.location.lng]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  fetchData(defaultIPAddress);

  document
    .getElementById('search-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();
      const ipAddress = document.getElementById('ip-input').value;
      console.log('Input IP Address:', ipAddress);
      fetchData(ipAddress);
    });
});
