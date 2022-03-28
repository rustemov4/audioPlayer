import { data } from "../../data/data"
import { Container, Row} from 'react-bootstrap';
import GridItem from "../gridItem/gridItem";
import 'bootstrap/dist/css/bootstrap.min.css'
export default function Grid(props){
    return(
        <div>
            <Container className="p-4">
                <Row>
                    {
                        data.map((item) =>(
                            <GridItem name = {item.name} music = {item} logo = {item.cover}/>
                        ))
                    }
                </Row>
            </Container>
        </div>
    )
}