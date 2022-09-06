import {React , useState,useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate,useLocation} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../home.css'

function Booked()
{
    let BookingObj = useLocation().state
    let [BookedDetails,setBookedDetails] = useState({})
    let LocalBookedSeats = JSON.parse(localStorage.getItem("BookedObj")) || []
    let navigate = useNavigate();
    let [AlreadyBooked,setAlreadyBooked] = useState([])
    let temp = []

    useEffect(() => {
        let subtotal = 0
        let flag = 0
        for(let i=0 ; i<LocalBookedSeats.length ; i++)
        {
            if(LocalBookedSeats[i].show == BookingObj.show)
            {
                BookingObj.SelectedSeats.map((item)=>
                {
                    let j = 0
                    LocalBookedSeats[i].SelectedSeats.map((obj)=>
                    {
                        item.seats.map(seatNo =>
                            {
                                while( obj.seats[j] == seatNo)
                                { 
                                    temp.push(seatNo)
                                    flag = 1
                                    j++
                                }
                                console.log(temp)
                                setAlreadyBooked(temp)
                                
                            })
        
                    })
                })
            }
        }
        
        flag==0 && BookingObj.SelectedSeats.map((item)=>
        {   
            
            subtotal = subtotal + item.price * item.seats.length
            let newObj = {
                subtotal: subtotal ,
                serviceTax : subtotal*14/100 , 
                swachhCess : subtotal*0.5/100,
                krishiCess : subtotal*0.5/100
            }
            console.log(newObj)
            setBookedDetails(newObj)
        
        })

        if(flag!=1)
        {
            let Obj = JSON.parse(localStorage.getItem("BookedObj")) || []
            Obj.push(BookingObj)
            localStorage.setItem("BookedObj",JSON.stringify(Obj))
        }
    },[])
    console.log(AlreadyBooked)

    return (
        
        <div className="card w-75 m-4" >
            <p className="card-header h3">Book Tickets</p>
            <div className="body">
                { AlreadyBooked.length!=0 ?
                    <div className='form'>
                        <div>
                            <div style={{display:'flex'}}>
                                <label className='p-3' style={{color:'red'}}> {AlreadyBooked.join()} Not available , Please select different seats</label>
                            </div>
                        </div>
                        <div className="inputbox text-center">
                            <Button variant="primary" onClick={()=>navigate(-1)}> Back </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                            <Button variant="success" disabled>Next</Button>{' '}
                        </div>
                    </div> 
                :
                    <div className="form">
                            <div>
                                <div style={{display:'flex'}}>
                                    <label className='px-3'> Successfully Booked : </label>
                                    <p> {BookingObj.show} </p>
                                </div>
                            </div>

                            <div>
                                <div style={{display:'flex'}}>
                                    <label className='px-3'> Subtotal : </label>
                                    <p> Rs.{BookedDetails.subtotal} </p>
                                </div>
                            </div>

                            <div>
                                <div style={{display:'flex'}}>
                                    <label className='px-3'> Service Tax @14% : </label>
                                    <p> Rs.{BookedDetails.serviceTax} </p>
                                </div>
                            </div>

                            <div>
                                <div style={{display:'flex'}}>
                                    <label className='px-3'> Swachh Bharat Cess @0.5% : </label>
                                    <p> Rs.{BookedDetails.swachhCess} </p>
                                </div>
                            </div>

                            <div>
                                <div style={{display:'flex'}}>
                                    <label className='px-3'> Krishi Kalyan Cess @0.5% : </label>
                                    <p> Rs.{BookedDetails.krishiCess} </p>
                                </div>
                            </div>

                            <div>
                                <div style={{display:'flex'}}>
                                    <label className='px-3'> Total : </label>
                                    <p> Rs.{BookedDetails.subtotal + BookedDetails.serviceTax + BookedDetails.swachhCess + BookedDetails.krishiCess} </p>
                                </div>
                            </div>

                            <div className="inputbox text-center">
                                <Button variant="primary" onClick={()=>navigate(-1)}> Back </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            
                                <Button variant="success" onClick={()=> navigate('/Summary',{state:BookedDetails})}>Next</Button>{' '}
                            </div>
                    </div>
                }
            </div>
        </div>
       
    )
}

export default Booked
