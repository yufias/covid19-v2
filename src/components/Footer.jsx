import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <MDBFooter style={{padding: '20px 0px', marginTop: "20px", backgroundColor: 'white'}} fixed="bottom">
            <MDBContainer fluid="xl">
                <Row>
                    <Col>
                        &copy; {new Date().getFullYear()} Made with 🖤 by : Yufi Ariftiyo Sidi
                    </Col>
                </Row>
                <Row>
                    <Col>
                        API from : <a href="https://github.com/mathdroid/covid-19-api" target="_blank">Mathdroid</a> & <a href="https://github.com/Reynadi531/vaksincovid19-api" target="_blank">Reynaldi</a>
                    </Col>
                </Row>
            </MDBContainer>
        </MDBFooter>
    )
}

export default Footer;