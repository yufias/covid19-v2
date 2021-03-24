import { Container, Row, Col, Spinner, Card, Form } from 'react-bootstrap'
import Axios from 'axios'
import { useEffect, useState } from 'react'

function Home() {
    const [confirmed, setConfirm] = useState(0)
    const [death, setDeath] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [loading, setLoading] = useState(false)
    const [countries, setCountries] = useState([])
    const [countryConfirmed, setCountryConfirm] = useState(0)
    const [countryDeath, setCountryDeath] = useState(0)
    const [countryRecovered, setCountryRecovered] = useState(0)
    const [updated, setUpdate] = useState("")

    function globalData() {
        setLoading(true)
        Axios.get('https://covid19.mathdro.id/api')
        .then(data => { 
            const response = data.data

            setConfirm(response.confirmed.value)
            setDeath(response.deaths.value)
            setRecovered(response.recovered.value)
            setUpdate(response.lastUpdate)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    function getCountries() {
        Axios.get("https://covid19.mathdro.id/api/countries")
        .then(data => {
            setCountries(data.data.countries)
        })
        .catch(err => {
            console.log(err)
        })
    }

    function countryDetail(event) {
        console.log(event.target.value)
        const countryIso = event.target.value

        if(countryIso) {
            Axios.get(`https://covid19.mathdro.id/api/countries/${countryIso}`)
            .then(data => {
                console.log(data.data, "====")
                const response = data.data
    
                setCountryConfirm(response.confirmed.value)
                setCountryDeath(response.deaths.value)
                setCountryRecovered(response.recovered.value)
            })
            .catch(err => {
                console.log(err.response)
            })
        } else {
            setCountryConfirm(0)
            setCountryDeath(0)
            setCountryRecovered(0)
        }


    }

    useEffect(() => {
        globalData()
        getCountries()
    }, [])

    if(loading) {
        return (
            <Container fluid>
                <Spinner animation="grow" variant="primary" />
            </Container>
        )
    }
    

    return (
        <Container fluid="xl" style={{marginTop: "20px"}}>
            <Row className="row-bootstrap">
                <Col>
                    <h1>Kasus Covid-19 Global</h1>
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
            <Row className="row-bootstrap">
                <Col>
                    <span style={{color: "#5cb85c "}}>Last Update : {updated}</span>
                </Col>
            </Row>
            <Row className="row-bootstrap">
                <Col>
                    <h2>Kasus Per Negara</h2>
                </Col>
            </Row>
            <Row className="row-bootstrap">
                <Col>
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Control as="select" custom onChange={countryDetail}>
                                <option value="">Pilih Negara</option>
                                {countries.map((country, i) => {
                                    if(country.iso3) {
                                        return (
                                            <option key={i} value={country.iso3}>{country.name}</option>
                                        )
                                    }
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
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
                                {countryConfirmed.toLocaleString()}
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
                                {countryDeath.toLocaleString()}
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
                                {countryRecovered.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="row-bootstrap">
                <Col lg={12}>
                    <img src="https://covid19.mathdro.id/api/og" width="100%"></img>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;