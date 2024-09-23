import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Button, Image, Spinner, Table } from 'react-bootstrap'
import { fetchOneDevice, fetchDeviceRating } from '../http/catalogAPI.js'
import { AppContext } from '../components/AppContext.js'
import { append } from '../http/basketAPI.js'

const Device = () => {
  const { id } = useParams()
  const { basket } = useContext(AppContext)
  const [device, setDevice] = useState(null)
  const [rating, setRating] = useState(null)

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
    fetchDeviceRating(id).then(data => setRating(data))
  }, [id])

  const handleClick = (deviceId) => {
    append(deviceId).then(data => {
        basket.devices = data.devices
    })
  }

  if (!device) return <Spinner animation='border' />;
  
  return (
    <Container>
    <Row className="mt-3 mb-3">
        <Col lg={4}>
            {device.image ? (
                <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + device.image} />
            ) : (
                <Image width={300} height={300} src="http://via.placeholder.com/300" />
            )}
        </Col>
        <Col lg={8}>
            <h1>{device.name}</h1>
            <h3>{device.price}.00 руб.</h3>
            <p>Бренд: {device.brand.name}</p>
            <p>Категория: {device.type.name}</p>
            <div>
                {rating ? (
                    <p>Рейтинг: {rating.rating}, голосов {rating.votes}</p>
                ) : (
                    <Spinner animation="border" />
                )}
            </div>
            <Button onClick={() => handleClick(device.id)}>Добавить в корзину</Button>
        </Col>
    </Row>
    {!!device.props.length &&
        <Row>
            <Col>
                <h3>Характеристики</h3>
                    <Table bordered hover size="sm">
                        <tbody>
                            {device.props.map(item => 
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
            </Col>
        </Row>
    }
</Container>
  );
}

export default Device;