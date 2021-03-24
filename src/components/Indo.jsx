import { Container, Row, Col, Spinner, Card } from 'react-bootstrap'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';

function Indo() {
    const [confirmed, setConfirm] = useState(0)
    const [death, setDeath] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [loading, setLoading] = useState(false)
    const [tableData, setData] = useState({})
    const [rows, setRows] = useState([])

    function getIndonesia() {
        setLoading(true)
        Axios.get("https://covid19.mathdro.id/api/countries/IDN")
        .then(data => {
            const response = data.data

            setConfirm(response.confirmed.value)
            setDeath(response.deaths.value)
            setRecovered(response.recovered.value)

            return Axios.get("https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi")
        })
        .then(data => {
            const response = data.data

            setRows(response)
            setData({
                columns: [
                    {
                        label: "Provinsi",
                        field: "provinsi"
                    }, 
                    {
                        label: "Kasus",
                        field: "kasus"
                    }, 
                    {
                        label: "Dirawat",
                        field: "dirawat"
                    }, 
                    {
                        label: "Meninggal",
                        field: "meninggal"
                    },
                    {
                        label: "Sembuh",
                        field: "sembuh"
                    }
                ],
                rows: response
            })
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            console.log(tableData)
            setLoading(false)
        })
    }

    useEffect(() => {
        getIndonesia()
    }, [])


    if(loading) {
        return (
            <Container fluid>
                <Spinner animation="grow" variant="primary" />
            </Container>
        )
    }
    

    return (
        <Container fluid="xl">
            <Row className="row-bootstrap">
                <Col>
                    <h1>Kasus Covid-19 Indonesia</h1>
                </Col>
            </Row>
            <Row className="row-bootstrap">
                <Col xl={4}>
                    <Card
                        bg="white"
                        text="warning"
                        style={{ width: '18rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Positif </Card.Title>
                            <Card.Text>
                                {confirmed.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card
                        bg="white"
                        text="danger"
                        style={{ width: '18rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Meninggal </Card.Title>
                            <Card.Text>
                                {death.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card
                        bg="white"
                        text="success"
                        style={{ width: '18rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Sembuh </Card.Title>
                            <Card.Text>
                                {recovered.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="row-bootstrap" style={{marginTop: "40px"}}>
                <Col>
                    <h1>Data Covid-19 Per Provinsi</h1>
                </Col>
            </Row>
            <Row className="row-bootstrap">
                <Col>
                    <MDBDataTable responsive style={{backgroundColor: "white", borderRadius: "8px"}} data={tableData} />
                </Col>
            </Row>
        </Container>
    )
}

export default Indo;