import {React , useState,useEffect} from 'react'
import {data} from '../db'
import { useNavigate} from 'react-router';

function Home()
{
    let [SelectedShow,setSelectedShow] = useState(data[0].Show1)
    let [BookingObj,setBookingObj] = useState({show:"Show1" , SelectedSeats:[]})
    let LocalBookedSeats = JSON.parse(localStorage.getItem("BookedObj")) || []
    let navigate = useNavigate();
    // let BookedSeatNo = []

    // for(let i=0 ; i<BookedObj.length ; i++)
    // {
    //     BookedObj[i].SelectedSeats.map((item)=>
    //     item.seats.map(No =>       
    //         BookedSeatNo.push(No)
    //         )
    //     )
    // }
    // console.log(BookedSeatNo)

    // const fetch = () =>
    // {
        
    //     for(let i=0 ; i<LocalBookedSeats.length ; i++)
    //     {
    //         if(LocalBookedSeats[i].show == BookingObj.show)
    //         {
    //             LocalBookedSeats[i].SelectedSeats.map(item=>
    //             {
    //                 SelectedShow = SelectedShow?.map(oneSeat=>
    //                 {
    //                     item.seats.map(bookedSeatNo=>
    //                     {
    //                         oneSeat?.seats.map((seatNo,ind)=>
    //                         {
    //                             if(bookedSeatNo == seatNo)
    //                             {
    //                                 oneSeat.seats.splice(ind,1)
    //                             }
    //                         })
    //                     })
    //                     return oneSeat
    //                 })
    //                 setSelectedShow(SelectedShow)
    //             })
    //         }
    //     }
    // }
 
    useEffect(() => {
        // fetch()
    },[])
    
    //-----------------------------------------FUNCTION WHEN SHOW CHANGE---------------------------------
    const handleShowChange = (value,ind) =>
    {
        // for(let i=0 ; i<BookedObj.length ; i++)
        // {
        //     if(BookedObj[i].show!=null && BookedObj[i].show!=value)
                setBookingObj({show:value,SelectedSeats:[]})
            
        // }
        setSelectedShow(ind[value])
    }
    // console.log(BookingObj)

    //-----------------------------------FUNCTION TO CREATE SELECTED SHOW AND SEAT OBJECT------------------------
    const handleSeatBook = (seatNo,categoryInd) =>
    { 
        //to show color change when user selects the seat number
        let btn = document.getElementById(`${seatNo}Btn`)
        if(btn.className == "btn btn-secondary btn-sm m-2")
            btn.className = "btn btn-danger btn-sm m-2"
        else
            btn.className = "btn btn-secondary btn-sm m-2"
    
        let found = 0
        BookingObj.SelectedSeats.map((item,ind)=>
            {
                if(item.category == SelectedShow[categoryInd].category)
                {
                    
                    if(item.seats.includes(seatNo))
                    {
                        let seatNoInd = BookingObj.SelectedSeats[ind].seats.indexOf(seatNo)
                        BookingObj.SelectedSeats[ind].seats.splice(seatNoInd,1)
                        console.log(BookingObj.SelectedSeats[ind].seats.length)
                        BookingObj.SelectedSeats[ind].seats.length == 0 && BookingObj.SelectedSeats.splice(ind,1)
                    } 
                    else
                    {
                        BookingObj.SelectedSeats[ind].seats.push(seatNo)
                         
                    } 
                    setBookingObj({...BookingObj})
                    found = 1
                }
                
            })
        
        if(found==0)
        {
            let Obj = {
                        category : SelectedShow[categoryInd].category,
                        seats : [seatNo] , 
                        price : SelectedShow[categoryInd].price
                    }
            setBookingObj({...BookingObj,SelectedSeats:[...BookingObj.SelectedSeats,Obj]})
        }   
    }
 
    const confirmBooking = () =>
    {
        
        if(BookingObj.SelectedSeats.length==0)
        {
            document.getElementById("error").style.display = "block"
        }
        else
        {
            navigate('/Confirm',{state:BookingObj})
        }
    }

    return(
        <div className="card w-75 m-4" >
            <p className="card-header h3">Book Tickets</p>
            <form>

                <div className='m-4'>
                    <label> Select Show : </label>
                    {data.map((ind) =>
                        <div key={Object.keys(ind)} className="form-check-inline m-2">
                            <div className="d-flex flex-row">
                                <input className="form-check-input" type="radio" value={Object.keys(ind)} checked={BookingObj.show == Object.keys(ind)} name="show" onChange={(e)=> handleShowChange(e.target.value,ind)}/> &nbsp;
                                <p>{Object.keys(ind)}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className='m-4'>
                { SelectedShow?.map((item,ind)=>
                    <div key={ind} className="m-4">
                        { item?.seats.map((seatNumber,i) =>{
                           return ( 
                            <button key={i} type="button" id={`${seatNumber}Btn`} 
                                className = "btn btn-secondary btn-sm m-2"
                                // className={!BookedSeatNo.includes(seatNo)?"btn btn-secondary btn-sm m-2":"btn btn-danger btn-sm m-2"}
                            onClick={()=>handleSeatBook(seatNumber,ind)} style={{height:'50px',width:'50px'}}> {seatNumber}</button>
                        )})}
                    </div>
                )}
                </div>

                <div className='m-4'>
                    <div style={{display:"flex",flexDirection:'row'}}>
                        <label style={{marginRight:'10px'}}> Select Seats : </label>
                       
                        {BookingObj.SelectedSeats.length ? BookingObj.SelectedSeats.map((item,ind)=>
                            <p key={ind} >
                                {item.seats.map((seatNo) =>
                                    
                                    <label key={seatNo} className='px-1'> {seatNo} </label> 
                                )}
                            </p>)
                            :
                            <label className='px-1'>-----</label>
                        }
                    </div>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={confirmBooking}> Book</button>
                </div>
                <label id="error" className='m-4' style={{display:'none',color:'red',fontSize:'14px'}}>Please select seat number you want to book!!</label>      
            </form>
        </div>
    )
}
export default Home