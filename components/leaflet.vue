    <template>
         <div id="map" class="min-h-screen md:mr-5 w-full  px-1 md:px-5 z-10 relative">
    
    
    </div>
   
    </template>
    <script setup>
    import {onMounted} from 'vue';
    import {useNuxtApp} from '#app';
    const { $L } = useNuxtApp(); 
    const popupContent = `
     <div>
     <h1>Hahu Jobs</h1>
     <!-- <img src="https://res.cloudinary.com/dtlezwrzm/image/upload/f_webp,q_auto:best,e_sharpen:100/minab_map_w2jaen.jpg" alt="Location Image" style="width: 100%; height: auto;" /> -->
     </div>
    `; 
    onMounted(()=> {
    // Initialize Leaflet map after the component has been mounted (client-side)
    const map = $L.map('map').setView([8.9894, -38.7860], 13);
    $L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    $L.marker([8.9894, 38.7860]).addTo(map)
    .bindPopup(popupContent)
    .openPopup()
    
    });
   </script>