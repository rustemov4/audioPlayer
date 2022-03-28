import { Card,Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import './gridItem.css'
import { useDispatch} from "react-redux";
import { setMusic } from "../../store/slicers";
import React from "react";

export default function GridItem(props){
    const dispatch = useDispatch()
    return(
        
            <Col xs ={6} sm={6} md ={4} lg={3} className='mt-3'>
                <Card className=' h-100 shadow-sm '>
                    <Card.Img className='card-img-top'src = {props.logo} onClick = {() => {
                        dispatch(setMusic({music: props.music}))
                        }} />
                    <Card.Body>
                        <Card.Title>
                            {props.name}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </Col>
    )
}