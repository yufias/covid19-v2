import { Container, Row, Col, Spinner, Card } from 'react-bootstrap'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact';

function Indo() {
    const [targetTotal, setTargetTotal] = useState(0)
    const [targetNakes, setTargetNakes] = useState(0)
    const [targetLansia, setTargetLansia] = useState(0)
    const [targetPetugasPublik, setTargetPetugasPublik] = useState(0)
    const [vaksinasi1, setVaksinasi1] = useState(0)
    const [vaksinasi2, setVaksinasi2] = useState(0)
    const [lastUpdate, setLastUpdate] = useState(0)
    const [loading, setLoading] = useState(false)

    function getVaksin() {
        setLoading(true)
        Axios.get("https://vaksincovid19-api.now.sh/api/vaksin")
        .then(data => {
            console.log(data.data)
            const response = data.data

            setTargetTotal(response.totalsasaran)
            setTargetLansia(response.sasaranvaksinlansia)
            setTargetNakes(response.sasaranvaksinsdmk)
            setTargetPetugasPublik(response.sasaranvaksinpetugaspublik)
            setVaksinasi1(response.vaksinasi1)
            setVaksinasi2(response.vaksinasi2)
            setLastUpdate(response.lastUpdate)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    

    useEffect(() => {
        getVaksin()
    }, [])


    if(loading) {
        return (
            <Container fluid>
                <Spinner animation="grow" variant="primary" />
            </Container>
        )
    }
    

    return (
        <Container fluid="xl" style={{minHeight: "750px"}}>
            <Row className="row-bootstrap">
                <Col>
                    <h1>Vaksinasi Covid-19 Indonesia</h1>
                </Col>
            </Row>
            <Row className="row-bootstrap" style={{margin: "40px auto"}}>
                <Col xl={12}>
                    <Card
                        bg="white"
                        text="primary"
                        style={{ width: '22rem', height: '7rem' }}
                        className="m-auto p-auto"
                    >
                        <Card.Body className="p-auto">
                            <Card.Title> Target Vaksinasi </Card.Title>
                            <Card.Text>
                                {targetTotal.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="row-bootstrap" style={{margin: "40px auto"}}>
                <Col xl={4}>
                    <Card
                        bg="white"
                        text="info"
                        style={{ width: '22rem', height: '7rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Target Vaksinasi Lansia </Card.Title>
                            <Card.Text>
                                {targetLansia.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card
                        bg="white"
                        text="info"
                        style={{ width: '22rem', height: '7rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Target Vaksinasi Nakes </Card.Title>
                            <Card.Text>
                                {targetNakes.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card
                        bg="white"
                        text="info"
                        style={{ width: '22 rem', height: '7rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Target Vaksinasi Petugas Publik </Card.Title>
                            <Card.Text>
                                {targetPetugasPublik.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="row-bootstrap" style={{margin: "40px auto"}}>
                <Col xl={6}>
                    <Card
                        bg="white"
                        text="success"
                        style={{ width: '22 rem', height: '7rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Vaksinasi Tahap 1 </Card.Title>
                            <Card.Text>
                                {vaksinasi1.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={6}>
                    <Card
                        bg="white"
                        text="success"
                        style={{ width: '22 rem', height: '7rem' }}
                        className="m-auto"
                    >
                        <Card.Body>
                            <Card.Title> Vaksinasi Tahap 2 </Card.Title>
                            <Card.Text>
                                {vaksinasi2.toLocaleString()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="row-bootstrap" style={{margin: "40px auto"}}>
                <Col>
                    <span style={{color: "#5cb85c "}}>Last Update : {lastUpdate}</span>
                </Col>
            </Row>
        </Container>
    )
}

export default Indo;