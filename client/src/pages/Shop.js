import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useLocation, useSearchParams } from 'react-router-dom'
import TypeBar from '../components/TypeBar.js'
import BrandBar from '../components/BrandBar.js'
import DeviceList from '../components/DeviceList.js'
import { AppContext } from '../components/AppContext.js'
import { fetchTypes, fetchBrands, fetchAllDevices } from '../http/catalogAPI.js'


const getSearchParams = (searchParams) => {
  let type = searchParams.get('type')
  if (type && /[1-9][0-9]*/.test(type)) {
      type = parseInt(type)
  }
  let brand = searchParams.get('brand')
  if (brand && /[1-9][0-9]*/.test(brand)) {
      brand = parseInt(brand)
  }
  let page = searchParams.get('page')
  if (page && /[1-9][0-9]*/.test(page)) {
      page = parseInt(page)
  }
  return {type, brand, page};
}


const Shop = observer(() => {
  const { catalog } = useContext(AppContext)

  const [typesFetching, setTypesFetching] = useState(true)
  const [brandsFetching, setBrandsFetching] = useState(true)
  const [devicesFetching, setDevicesFetching] = useState(true)

  const location = useLocation()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    fetchTypes()
      .then(data => catalog.types = data)
      .finally(() => setTypesFetching(false))

    fetchBrands()
      .then(data => catalog.brands = data)
      .finally(() => setBrandsFetching(false))

    const {type, brand, page} = getSearchParams(searchParams)
    catalog.type = type
    catalog.brand = brand
    catalog.page = page ?? 1

    fetchAllDevices(catalog.type, catalog.brand, catalog.page, catalog.limit)
      .then(data => { catalog.devices = data.rows
                      catalog.count = data.count
      })
      .finally(() => setDevicesFetching(false))

  }, [catalog, searchParams]) 


  // При каждом клике на категорию, бренд или номер страницы — мы добавляем элемент в историю
  // браузера, ссылки в истории имеют вид /?page=1, /?page=2, /?page=3. При нажатии кнопки 
  // «Назад» браузера — мы отслеживаем изменение GET-параметров и изменяем состояние хранилища.
  useEffect(() => {
    const {type, brand, page} = getSearchParams(searchParams)

    if (type || brand || page) {
        if (type !== catalog.type) catalog.type = type
        if (brand !== catalog.brand) catalog.brand = brand
        if (page !== catalog.page) catalog.page = page ?? 1
    } else  {
        catalog.type = null
        catalog.brand = null
        catalog.page = 1
    }
  }, [catalog, location.search, searchParams])

  // при клике на категорию, бренд, номер страницы или при нажатии кнопки  «Назад» 
  // браузера — получам с сервера список товаров, потому что это уже другой список
  useEffect(() => {
    setDevicesFetching(true)
    fetchAllDevices(catalog.type, catalog.brand, catalog.page, catalog.limit)
      .then(data => {
          catalog.devices = data.rows
          catalog.count = data.count
      })
      .finally(() => setDevicesFetching(false))
  }, [catalog.type, catalog.brand, catalog.page, catalog])

  return (
    <Container>
        <Row className="mt-2">
            <Col md={3} className="mb-3">
              {typesFetching ? (
                <Spinner animation='border' />
              ) : (
                <TypeBar />
              )}
            </Col>
            <Col md={9}>
              <div>
                {brandsFetching ? (
                      <Spinner animation="border" />
                    ) : (
                      <BrandBar />
                    )}
              </div>
              <div>
                {devicesFetching ? (
                      <Spinner animation="border" />
                    ) : (
                      <DeviceList />
                    )}
              </div>
            </Col>
        </Row>
    </Container>
  );
})


export default Shop;
