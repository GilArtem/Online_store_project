import { Row, Pagination } from 'react-bootstrap'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { AppContext } from './AppContext.js'
import DeviceItem from './DeviceItem.js'


const DeviceList = observer(() => {
    const { catalog } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (page) => {
        catalog.page = page
         // при каждом клике добавляем в историю браузера новый элемент
         const params = {}
         if (catalog.type) params.type = catalog.type
         if (catalog.brand) params.brand = catalog.brand
         if (catalog.page > 1) params.page = catalog.page
         navigate({
             pathname: '/',
             search: '?' + createSearchParams(params),
         })
    }

    const pages = []
    for (let page = 1; page <= catalog.pages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === catalog.page}
                activeLabel=""
                onClick={() => handleClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    return (
        <>
            <Row className="mb-3">
                {catalog.devices.length ? (
                    catalog.devices.map(item =>
                        <DeviceItem key={item.id} data={item} />
                    )
                ) : (
                    <p className="m-3">По вашему запросу ничего не найдено</p>
                ) }
            </Row>
            {catalog.pages > 1 && <Pagination>{pages}</Pagination>}
        </>
    )
});

export default DeviceList;