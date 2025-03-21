import DateReserve from "@/components/DateReserve";
import { TextField } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";

export default async function Booking() {

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createAt = new Date(profile.data.createAt)

    return (
        <main className="w-[100%] flex flex-col items-center">
            <h1 className="mt-8 text-2xl font-medium">Booking Venue</h1>
            <div className="mt-5">Name : {profile.data.name}</div>
            <div>Email : {profile.data.email}</div>
            <div>Tel. : {profile.data.tel}</div>
            <div>Member Since : {createAt.toString()}</div> 
            <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" sx={{ height: '2em', width: '200px', marginTop: '1rem' }}/>
            <TextField variant="standard" name="Contact-number" label="Contact-number" sx={{ height: '2em', width: '200px', marginTop: '1rem' }}/>
            <Select variant="standard" id="venue" sx={{ height: '2em', width: '200px', marginTop: '2rem' }}>
                <MenuItem value='Bloom'>The Bloom Pavilion</MenuItem>
                <MenuItem value='Spark'>Spark Space</MenuItem>
                <MenuItem value='GrandTable'>The Grand Table</MenuItem>
            </Select>
            <DateReserve/>
            <Button variant="outlined" name="Book Venue" sx = {{ marginTop:"1.5rem" }}>Book Venue</Button>
        </main>
    );
}