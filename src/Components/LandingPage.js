import React, { useState } from 'react';
import { Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';

const LandingPage = () => {
    const [route, setRoute] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleChange = (event) => {
        setRoute(event.target.value);
    };

    const stationCoordinates = {
        'High Bridge': { lat: 40.667931, lon: -74.895576 },
        'Annandale': { lat: 40.640911, lon: -74.881126 },
        'Lebanon': { lat: 40.641781, lon: -74.835358 },
        'White House': { lat: 40.6155126, lon: -74.7707356 },
        'North Branch': { lat: 40.6020469, lon: -74.6773823 },
        'Raritan': { lat: 40.567181, lon: -74.634683 },
        'Somerville': { lat: 40.5742696, lon: -74.60988 },
        'Bridgewater': { lat: 40.5598127, lon: -74.5517146 },
        'Bound Brook': { lat: 40.5684363, lon: -74.5384889 },
        'Dunellen': { lat: 40.5892696, lon: -74.4718201 },
        'Plainfield': { lat: 40.6337136, lon: -74.4073737 },
        'Netherwood': { lat: 40.6290506, lon: -74.4033895 },
        'Fanwood': { lat: 40.6409555, lon: -74.383846 },
        'Westfield': { lat: 40.6589912, lon: -74.3473717 },
        'Garwood': { lat: 40.6517692, lon: -74.3229264 },
        'Cranford': { lat: 40.6584358, lon: -74.2995923 },
        'Roselle Park': { lat: 40.6645469, lon: -74.2643133 },
        'Union': { lat: 40.698967, lon: -74.266861 },
        'Newark Penn Station': { lat: 40.732598, lon: -74.174796 },
        'Secaucus Junction': { lat: 40.788513, lon: -74.058787 },
        'Penn Station New York': { lat: 40.750079, lon: -73.991348 },
    };

    const fetchWeatherData = async () => {
        if (!route || !stationCoordinates[route]) return;

        const { lat, lon } = stationCoordinates[route];
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        try {
            const response = await axios.get(apiUrl);
            setWeatherData(response.data);
            console.log(response.data); // Log response for now
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };


    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                sx={{ color: 'white' }}
            >
                <Typography variant="h3" gutterBottom align="center" sx={{ color: 'white' }}>
                    NJ Transit Delay Predictor
                </Typography>
                <Typography variant="body1" align="center" paragraph sx={{ color: 'white' }}>
                    Select a route or train ID to see delay predictions.
                </Typography>
                <Box display="flex" width="100%" alignItems="center">
                    <FormControl fullWidth variant="outlined" margin="normal" sx={{ color: 'white' }}>
                        <InputLabel sx={{ color: 'white', fontFamily: 'Helvetica' }}>Route or Train ID</InputLabel>
                        <Select
                            label="Route or Train ID"
                            value={route}
                            onChange={handleChange}
                            sx={{
                                color: 'white',
                                fontFamily: 'Helvetica',
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'white',
                                },
                                '.MuiSvgIcon-root': {
                                    color: 'white',
                                },
                            }}
                            inputProps={{
                                sx: {
                                    backgroundColor: '#424242'
                                },
                            }}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: '#424242',
                                        color: 'white', 
                                    },
                                },
                            }}
                        >
                            {Object.keys(stationCoordinates).map((station) => (
                                <MenuItem key={station} value={station}>
                                    {station}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        sx={{ marginLeft: '10px', backgroundColor: '#05070A', color: 'white' }}
                        onClick={fetchWeatherData}
                    >
                        Enter
                    </Button>
                </Box>
                {weatherData && (
                    <Box mt={2} p={2} bgcolor="#333" borderRadius="8px">
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Weather: {weatherData.current_weather.precipitation ? `${weatherData.current_weather.precipitation} mm` : 'No precipitation'}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default LandingPage;