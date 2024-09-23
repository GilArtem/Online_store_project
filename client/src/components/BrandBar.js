import { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { AppContext } from './AppContext.js'


const BrandBar = observer(() => {
    const { catalog } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (id) => {
        if (id === catalog.brand) {
            catalog.brand = null
        } else {
            catalog.brand = id
        }
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

    return (
        <ListGroup horizontal>
            {catalog.brands.map(item =>
                <ListGroup.Item
                    key={item.id}
                    active={item.id === catalog.brand}
                    onClick={() => handleClick(item.id)}
                    style={{cursor: 'pointer'}}
                >
                    {item.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default BrandBar;