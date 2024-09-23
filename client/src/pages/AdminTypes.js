import { useState, useEffect } from 'react'
import { fetchTypes, deleteType } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditType from '../components/EditType.js'

const AdminTypes = () => {
    const [types, setTypes] = useState(null) // список загруженных категорий
    const [fetching, setFetching] = useState(true) // загрузка списка категорий с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id категории, которую будем редактировать — для передачи в <EditType id={…} />
    const [typeId, setTypeId] = useState(null)

    const handleCreateClick = () => {
        setTypeId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setTypeId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteType(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Категория «${data.name}» удалена`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchTypes()
            .then(
                data => setTypes(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />;
    }

    return (
        <Container>
            <h1>Категории</h1>
            <Button onClick={() => handleCreateClick()}>Создать категорию</Button>
            <EditType id={typeId} show={show} setShow={setShow} setChange={setChange} />
            {types.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                    <thead>
                        <tr>
                            <th>Название</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.map(item => 
                            <tr key={item.id}>
                                <td>{item.name}</td>
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
            ) : (
                <p>Список категорий пустой</p>
            )}
        </Container>
    );
}

export default AdminTypes;