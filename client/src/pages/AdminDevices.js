import { useState, useEffect } from 'react'
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap'
import { fetchAllDevices, deleteDevice } from '../http/catalogAPI.js'
import CreateDevice from '../components/CreateDevice.js'
import UpdateDevice from '../components/UpdateDevice.js'

// количество товаров на страницу
const ADMIN_PER_PAGE = 6

const AdminDevices = () => {
    const [devices, setDevices] = useState([]) // список загруженных товаров
    const [fetching, setFetching] = useState(true) // загрузка списка товаров с сервера
    const [createShow, setCreateShow] = useState(false) // модальное окно создания товара
    const [updateShow, setUpdateShow] = useState(false) // модальное окно редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id товара, который будем редактировать — для передачи в <UpdateDevice id={…} />
    const [device, setDevice] = useState(null)

    // текущая страница списка товаров
    const [currentPage, setCurrentPage] = useState(1)
    // сколько всего страниц списка товаров
    const [totalPages, setTotalPages] = useState(1)

    // обработчик клика по номеру страницы
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // содержимое компонента <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleUpdateClick = (id) => {
        setDevice(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteDevice(id)
            .then(
                data => {
                    // если это последняя страница и мы удаляем на ней единственный
                    // оставшийся товар — то надо перейти к предыдущей странице
                    if (totalPages > 1 && devices.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    alert(`Товар «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchAllDevices(null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setDevices(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) return <Spinner animation="border" />;

    return (
        <Container>
            <h1>Товары</h1>
            <Button onClick={() => setCreateShow(true)}>Создать товар</Button>
            <CreateDevice show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateDevice id={device} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {devices.length > 0 ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Фото</th>
                            <th>Категория</th>
                            <th>Бренд</th>
                            <th>Цена</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    {item.image &&
                                    <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank" rel="noreferrer">фото</a>}
                                </td>
                                <td>{item.type?.name || 'NULL'}</td>
                                <td>{item.brand?.name || 'NULL'}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                        Редактировать
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                        Удалить
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                    {totalPages > 1 && <Pagination>{pages}</Pagination>}
                </>
            ) : (
                <p>Список товаров пустой</p>
            )}
        </Container>
    );
}

export default AdminDevices;