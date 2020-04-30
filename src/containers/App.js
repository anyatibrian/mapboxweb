import React, {useEffect,useState, useRef } from 'react'
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import  MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import axios from 'axios'
import {Row, Col,Collapse, Typography, Progress} from 'antd'
const { Title,Text} = Typography
const { Panel } = Collapse

const  App =()=>{
    const mapdiv = useRef()
    const [ permits, setPermits] = useState([])
    //handling health permits
    const healthPermits = []
    const pendingHealthPermit = []
    const deniedHealthPermits = []
    const approvedHealthPermit = []
    const warnedHealthPermit = []

    //handling occupation permits
    const occupationPermits = []
    const pendingOccupationPermit = []
    const deniedOccupationPermit = []
    const approvedOccupationPermit = []
    const warnedOccupationPermits = []

    //food handler
    const foodHandlerPermits = []
    const pendingFoodHandlerPermits = []
    const deniedFoodHandlerPermits = []
    const warnedFoodHandlerPermits = []
    const approvedFoodHandlerPermits = []

    // complains
    const complains = []
    const deniedComplains = []
    const approvedComplains = []
    const warnedComplains = []
    const pendingComplains = []

    /**
     * user effect life circle hooks
     */
    useEffect(()=>{
        getCurrentLocation()
    },[setPermits])
    const getCurrentLocation = async() =>{
        await navigator.geolocation.getCurrentPosition(({coords})=>{
            showMaps(coords.longitude, coords.latitude)
        },(error)=>{
            console.log(error)
        },{
            maximumAge:60000,
            timeout:20000,
            enableHighAccuracy:true
        })
    }
    /**
     * 
     * @param {*} props 
     * 
     */
    const showMaps= async(latitude, longitude)=>{
        const response = await axios.get(`http://localhost:3000/permits`)
        setPermits(response.data)
        // generating the map elements for adding it into the application
        const node = mapdiv.current
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW55YXRpYnJpYW4iLCJhIjoiY2s1cGdrN3Y2MHNqbjNobW80eXF2MHAwNyJ9.3valCGJERUuqC_EqTY-E1Q';
        const  map = new mapboxgl.Map({
            container: node,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [latitude,longitude],
            zoom: 12,
            trackResize: true
            });
        // Add geolocate control to the map.
        map.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
            }))
        // the driving direction controls
        const direction = new MapboxDirections({
            accessToken:mapboxgl.accessToken,
            flyTo: true
            })
         map.addControl(direction, 'top-left')
        // adding navigation control
         map.addControl(new mapboxgl.NavigationControl());
         //creating markers for various S.O.P
         
         response.data.forEach((permits)=>{
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h3>${permits.type}</h3>
                 <p>${permits.descriptions}</p>
                `
                );
             let el = document.createElement('div')
             // handling all the complains and it status 
             if (permits.status === 'warning' && permits.type === 'complaints'){
                 el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="complain-warn"/>)

                 new mapboxgl.Marker(el)
                 .setLngLat(permits.coordinates)
                 .setPopup(popup)
                 .addTo(map);
             }
             if(permits.status === 'pending' && permits.type === 'complaints'){
                el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="complain-pending"/>)
                new mapboxgl.Marker(el)
                .setLngLat(permits.coordinates)
                .setPopup(popup)
                .addTo(map);
             }
             if(permits.status === 'approved' && permits.type === 'complaints'){
                el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="complain-approved"/>)
                new mapboxgl.Marker(el)
                .setLngLat(permits.coordinates)
                .setPopup(popup)
                .addTo(map);
             }
             if(permits.status === 'denied' && permits.type === 'complaints'){
                el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="complain-denied"/>)
                new mapboxgl.Marker(el)
                .setLngLat(permits.coordinates)
                .setPopup(popup)
                .addTo(map);
             }
             //handling all the food liencence and its status 
             if (permits.status === 'warning' && permits.type === 'food permit'){
                el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="foodhandler-warn"/>)
                new mapboxgl.Marker(el)
                .setLngLat(permits.coordinates)
                .setPopup(popup)
                .addTo(map);
            }
            if(permits.status === 'pending' && permits.type === 'food permit'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="foodhandler-pending"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            if(permits.status === 'approved' && permits.type === 'food permit'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="foodhandler-approved"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            if(permits.status === 'denied' && permits.type === 'food permit'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="foodhandler-denied"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            //handling all the occupational status
            if (permits.status === 'warning' && permits.type === 'occupation'){
                el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="occupation-warn"/>)
                new mapboxgl.Marker(el)
                .setLngLat(permits.coordinates)
                .setPopup(popup)
                .addTo(map);
            }
            if(permits.status === 'pending' && permits.type === 'occupation'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="occupation-pending"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            if(permits.status === 'approved' && permits.type === 'occupation'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="occupation-approved"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            if(permits.status === 'denied' && permits.type === 'occupation'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="occupation-denied"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            //handling all help permits
            if (permits.status === 'warning' && permits.type === 'health Permit'){
                el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="health-warn"/>)
                new mapboxgl.Marker(el)
                .setLngLat(permits.coordinates)
                .setPopup(popup)
                .addTo(map);
            }
            if(permits.status === 'pending' && permits.type === 'health Permit'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="health-pending"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            if(permits.status === 'approved' && permits.type === 'health Permit'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="health-approved"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            if(permits.status === 'denied' && permits.type === 'health Permit'){
               el.innerHTML = ReactDOMServer.renderToStaticMarkup(<div className="health-denied"/>)
               new mapboxgl.Marker(el)
               .setLngLat(permits.coordinates)
               .setPopup(popup)
               .addTo(map);
            }
            // setting the origin and directions of the map location
            el.addEventListener("click", ()=>{
                direction.setOrigin([latitude, longitude])
                direction.setDestination(permits.coordinates)
            })
            

         })
        // adding an animated maker to the point of origin
           let size = 150
           let pulsingDot = {
               width: size,
               height: size,
               data: new Uint8Array(size * size * 4),
               // get rendering context for the map canvas when layer is added to the map
               onAdd: function(){
                   const el = document.createElement('canvas')
                    el.width= this.width
                    el.height = this.height
                   this.context = el.getContext('2d')
               },
               // called once before every frame where the icon will be used
                render: function() {
                    let duration = 1000;
                    let t = (performance.now() % duration) / duration;

                    let radius = (size / 2) * 0.3;
                    let outerRadius = (size / 2) * 0.7 * t + radius;
                    let context = this.context;

                    // draw outer circle
                    context.clearRect(0, 0, this.width, this.height);
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        outerRadius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
                    context.fill();

                    // draw inner circle
                    context.beginPath();
                    context.arc(
                        this.width / 2,
                        this.height / 2,
                        radius,
                        0,
                        Math.PI * 2
                    );
                    context.fillStyle = 'rgba(255, 100, 100, 1)';
                    context.strokeStyle = 'white';
                    context.lineWidth = 2 + 4 * (1 - t);
                    context.fill();
                    context.stroke();

                    // update this image's data with data from the canvas
                    this.data = context.getImageData(
                        0,
                        0,
                        this.width,
                        this.height
                    ).data;

                    // continuously repaint the map, resulting in the smooth animation of the dot
                    map.triggerRepaint();
                    // return `true` to let the map know that the image was updated
                    return true;
                    }

           }
           //
           
            map.on('load', function() {
                map.addImage('pulsing-dot', pulsingDot, {
                    pixelRatio: 2
                });

                map.addSource('points', {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [{
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [latitude, longitude]
                            }
                        }]
                    }
                });
                map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    'icon-image': 'pulsing-dot'
                }
                });
                });

    }
    
    permits.forEach((permits)=>{
        //health permits
        permits.type === 'health Permit'? healthPermits.push(permits):''
        permits.status === 'pending' &&  permits.type === 'health Permit' ? pendingHealthPermit.push(permits):''
        permits.status === 'warning' &&  permits.type === 'health Permit' ? warnedHealthPermit.push(permits):''
        permits.status === 'denied' &&  permits.type === 'health Permit' ? deniedHealthPermits.push(permits):''
        permits.status === 'approved' &&  permits.type === 'health Permit' ? approvedHealthPermit.push(permits):''

        //occupation
        permits.type === 'occupation'? occupationPermits.push(permits): ''
        permits.status === 'pending' && permits.type === 'occupation'? pendingOccupationPermit.push(permits): ''
        permits.status === 'warning' && permits.type === 'occupation'? warnedOccupationPermits.push(permits): ''
        permits.status === 'approved' && permits.type === 'occupation'? approvedOccupationPermit.push(permits): ''
        permits.status === 'denied' && permits.type === 'occupation'? deniedOccupationPermit.push(permits): ''

        // food handler
        permits.type === 'food permit'?foodHandlerPermits.push(permits) :''
        permits.status === 'pending' && permits.type === 'food permit'? pendingFoodHandlerPermits.push(permits): ''
        permits.status === 'warning' && permits.type === 'food permit'? warnedFoodHandlerPermits.push(permits): ''
        permits.status === 'approved' && permits.type === 'food permit'? approvedFoodHandlerPermits.push(permits): ''
        permits.status === 'denied' && permits.type === 'food permit'? deniedFoodHandlerPermits.push(permits): ''

        //complains 
        permits.type === 'complaints'? complains.push(permits):''
        permits.status === 'pending' && permits.type === 'complaints'? pendingComplains.push(permits):''
        permits.status === 'warning' && permits.type === 'complaints'? warnedComplains.push(permits):''
        permits.status === 'approved' && permits.type === 'complaints'? approvedComplains.push(permits):''
        permits.status === 'denied' && permits.type === 'complaints'? deniedComplains.push(permits):''
        


    })
    console.log(pendingHealthPermit)
    return (
        <div className="mapComponent">
            <Row>
            <Col span={6}>
            <Typography>
            <Title level={3} className="Detailtitle"> S.O.P INFORMATION</Title>
            </Typography>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Health Permit" showArrow={false}>
                <Text>Total Health Permits</Text>
                <Progress percent={healthPermits.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#be79df"/>
                <Text>Approved</Text>
                <Progress percent={approvedHealthPermit.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#52de97"/>
                <Text>Pending</Text>
                <Progress percent={pendingHealthPermit.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#bbcfff"/>
                <Text>Warning</Text>
                <Progress percent={warnedHealthPermit.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#ffd082"/>
                  <Text>Denied</Text>
                  <Progress percent={deniedHealthPermits.length}
                    format={percent=>`${percent}`} 
                    size="default"
                    strokeColor="#eb4559"/>
                </Panel>
                <Panel header='Occupation' showArrow={false}>
                <Text>Total Occupation permits</Text>
                <Progress percent={occupationPermits.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#005082"/>
                <Text>Approved</Text>
                <Progress percent={approvedOccupationPermit.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#52de97"/>
                <Text>Pending</Text>
                <Progress percent={pendingOccupationPermit.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#bbcfff"/>
                <Text>Warning</Text>
                <Progress percent={warnedOccupationPermits.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#ffd082"/>
                  <Text>Denied</Text>
                  <Progress percent={deniedOccupationPermit.length}
                    format={percent=>`${percent}`} 
                    size="default"
                    strokeColor="#eb4559"/>
                </Panel>
                <Panel header="Food Handler" showArrow={false}>
                <Text>Total FoodHandler permits</Text>
                <Progress percent={foodHandlerPermits.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#687466"/>
                <Text>Approved</Text>
                <Progress percent={approvedFoodHandlerPermits.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#52de97"/>
                <Text>Pending</Text>
                <Progress percent={pendingFoodHandlerPermits.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#bbcfff"/>
                <Text>Warning</Text>
                <Progress percent={warnedFoodHandlerPermits.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#ffd082"/>
                  <Text>Denied</Text>
                  <Progress percent={deniedFoodHandlerPermits.length}
                    format={percent=>`${percent}`} 
                    size="default"
                    strokeColor="#eb4559"/>
                </Panel>
                <Panel header="Complains" showArrow={false}>
                <Text>Total Complains</Text>
                <Progress percent={complains.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#588da8"/>
                <Text>Approved</Text>
                <Progress percent={approvedComplains.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#52de97"/>
                <Text>Pending</Text>
                <Progress percent={pendingComplains.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#bbcfff"/>
                <Text>Warning</Text>
                <Progress percent={warnedComplains.length}
                  format={percent=>`${percent}`} 
                  size="default"
                  strokeColor="#ffd082"/>
                  <Text>Denied</Text>
                  <Progress percent={deniedComplains.length}
                    format={percent=>`${percent}`} 
                    size="default"
                    strokeColor="#eb4559"/>
                </Panel>
            </Collapse>
            </Col>
            <Col span={16}>
                <div ref={mapdiv} className="Map">
                </div>
            </Col>
       </Row>
    </div>
    )
}

export default App
