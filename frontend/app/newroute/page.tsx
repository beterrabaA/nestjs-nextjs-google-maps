'use client'

import { ChangeEvent, FormEvent, useRef, useState } from 'react'

import { useMap } from '@/hooks/useMaps'
import axios from 'axios'
import type {
  DirectionsResponseData,
  FindPlaceFromTextResponseData,
} from '@googlemaps/google-maps-services-js'

const NewRoutePage = () => {
  const [inputValues, setInputValues] = useState({
    source: '',
    destination: '',
  })
  const [directionsReponsed, setDirectionsReponsed] = useState<
    DirectionsResponseData & { request: any }
  >()

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const map = useMap(mapContainerRef)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputValues({ ...inputValues, [name]: value })
  }

  const searchPlaces = async (event: FormEvent) => {
    event.preventDefault()

    const baseUrl = process.env.NEXT_PUBLIC_API_ROUTE
    const [sourceResponse, destResponse] = await Promise.all([
      axios.get(`${baseUrl}/places?text=${inputValues.source}`),
      axios.get(`${baseUrl}/places?text=${inputValues.destination}`),
    ])

    if (sourceResponse.statusText !== 'OK') {
      console.error(sourceResponse)
      alert('Não foi possivel encontrar o local de origem')
    }

    if (destResponse.statusText !== 'OK') {
      console.error(sourceResponse)
      alert('Não foi possivel encontrar o local de destino')
    }

    const sourcePlace: FindPlaceFromTextResponseData = sourceResponse.data
    const destPlace: FindPlaceFromTextResponseData = destResponse.data

    const queryParams = new URLSearchParams({
      originId: sourcePlace.candidates[0].place_id as string,
      destinationId: destPlace.candidates[0].place_id as string,
    })

    const directionsReq = await axios.get(
      `${baseUrl}/directions?${queryParams.toString()}`,
    )

    const directionsResponseData: DirectionsResponseData & { request: any } =
      directionsReq.data
    setDirectionsReponsed(directionsResponseData)
    map?.addRouteWithIcons({
      routeId: '1',
      startMarkerOptions: {
        position: directionsResponseData.routes[0].legs[0].start_location,
      },
      endMarkerOptions: {
        position: directionsResponseData.routes[0].legs[0].end_location,
      },
      carMarkerOptions: {
        position: directionsResponseData.routes[0].legs[0].start_location,
      },
      directionsResponseData,
    })
  }

  const createRoute = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_ROUTE
    const info = {
      name: `${directionsReponsed?.routes[0].legs[0].start_address} - ${directionsReponsed?.routes[0].legs[0].end_address}`,
      source_id: directionsReponsed?.request.origin.place_id,
      destination_id: directionsReponsed?.request.destination.place_id,
    }
    const { data } = await axios.post(`${baseUrl}/routes`, info)

    const { steps } = data.directions.routes[0].legs[0]

    for (const step of steps) {
      await sleep(2000)
      moveCar(step.start_location)
      await sleep(2000)
      moveCar(step.end_location)
    }
  }

  const moveCar = (point: google.maps.LatLngLiteral) => {
    map?.moveCar('1', {
      lat: point.lat,
      lng: point.lng,
    })
  }

  return (
    <div className="flex flex-row h-full">
      <div>
        <h1>Nova rota</h1>
        <form className="flex flex-col text-black" onSubmit={searchPlaces}>
          <input
            id="source"
            name="source"
            onChange={handleOnChange}
            placeholder="Origem"
            type="text"
          />
          <input
            id="destination"
            name="destination"
            onChange={handleOnChange}
            placeholder="Destino"
            type="text"
          />
          <button type="submit" className="text-white">
            Pesquisar
          </button>
        </form>
        {directionsReponsed && (
          <ul>
            <li>
              Origem: {directionsReponsed?.routes[0].legs[0].start_address}
            </li>
            <li>
              Destino: {directionsReponsed?.routes[0].legs[0].end_address}
            </li>
            <li>
              Distância: {directionsReponsed?.routes[0].legs[0].distance.text}
            </li>
            <li>
              Duração: {directionsReponsed?.routes[0].legs[0].duration.text}
            </li>
            <li>
              <button
                className="bg-blue-500 p-4 text-white rounded"
                onClick={() => createRoute()}
              >
                Adicionar rota
              </button>
            </li>
          </ul>
        )}
      </div>
      <div id="map" className="h-full w-full" ref={mapContainerRef} />
    </div>
  )
}

export default NewRoutePage

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
