import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  Button,
  Avatar
} from '@mui/material';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isToday 
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Configuração do tema
const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#4caf50' },
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
  },
});

// Componente para renderizar um dia do calendário
const CalendarDay = ({ date, isWorkDay }: { date: Date; isWorkDay: boolean }) => (
  <Box
    sx={{
      p: { xs: 0.5, sm: 1 },
      textAlign: 'center',
      backgroundColor: isWorkDay ? '#e3f2fd' : '#e8f5e9',
      borderRadius: '8px',
      border: isToday(date) ? '2px solid #3498db' : '1px solid #e0e0e0',
      minHeight: { xs: '60px', sm: '70px', md: '80px' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }
    }}
  >
    <Typography sx={{ 
      fontWeight: isToday(date) ? 'bold' : 'normal',
      color: isToday(date) ? '#3498db' : '#2c3e50',
      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
    }}>
      {format(date, 'd')}
    </Typography>
    <Typography 
      variant="caption" 
      display="block" 
      sx={{ 
        color: isToday(date) ? '#3498db' : '#2c3e50',
        fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
        fontWeight: 'medium'
      }}
    >
      {format(date, 'EEE', { locale: ptBR })}
    </Typography>
    <Typography 
      variant="caption" 
      display="block" 
      sx={{ 
        mt: 0.5,
        color: isWorkDay ? '#3498db' : '#27ae60',
        fontWeight: 'medium',
        fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' }
      }}
    >
      {isWorkDay ? 'Trabalho' : 'Folga'}
    </Typography>
  </Box>
);

// Componente principal
function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [startDate] = useState<Date>(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const isWorkDay = (date: Date): boolean => {
    const diffDays = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays % 2 === 0;
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  // Adiciona dias vazios no início do mês para alinhar com domingo
  const firstDayOfMonth = startOfMonth(currentDate);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Domingo, 1 = Segunda, etc.
  const emptyDays = Array(firstDayOfWeek).fill(null);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        py: 4
      }}>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              align="center" 
              sx={{ 
                color: '#1a237e',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                mb: 2,
                fontSize: { xs: '1.2rem', sm: '1.8rem', md: '2.5rem' },
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                letterSpacing: '0.5px',
                px: 2
              }}
            >
              Será que o Rômulo vai trabalhar hoje?
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 4,
              '& > *': {
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }
            }}>
              <Avatar
                src="/logo.jpg"
                alt="Logo"
                sx={{
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  border: '3px solid #3949ab'
                }}
              />
            </Box>
            
            <Paper elevation={3} sx={{ 
              p: { xs: 1.5, sm: 2, md: 3 }, 
              mt: 3,
              overflow: 'hidden'
            }}>
              {/* Cabeçalho do calendário */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between', 
                alignItems: { xs: 'center', sm: 'flex-start' },
                mb: { xs: 1.5, sm: 2 },
                gap: { xs: 1.5, sm: 0 }
              }}>
                <Typography variant="h6" sx={{ 
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' } 
                }}>
                  {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </Typography>
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: 'row' },
                  gap: { xs: 0.5, sm: 1 }
                }}>
                  <Button 
                    variant="contained" 
                    onClick={prevMonth} 
                    sx={{ 
                      backgroundColor: '#3949ab',
                      '&:hover': {
                        backgroundColor: '#283593'
                      },
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      px: { xs: 1.5, sm: 2, md: 3 },
                      py: { xs: 0.5, sm: 1 }
                    }}
                  >
                    Mês Anterior
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={nextMonth}
                    sx={{ 
                      backgroundColor: '#3949ab',
                      '&:hover': {
                        backgroundColor: '#283593'
                      },
                      borderRadius: '20px',
                      textTransform: 'none',
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      px: { xs: 1.5, sm: 2, md: 3 },
                      py: { xs: 0.5, sm: 1 }
                    }}
                  >
                    Próximo Mês
                  </Button>
                </Box>
              </Box>

              {/* Grid do calendário */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: { xs: 0.5, sm: 1, md: 1.5 },
                mt: { xs: 1, sm: 1.5, md: 2 }
              }}>
                {/* Dias da semana */}
                {weekDays.map((day) => (
                  <Typography 
                    key={day} 
                    align="center" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#ffffff',
                      py: { xs: 0.5, sm: 0.75 },
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' }
                    }}
                  >
                    {day}
                  </Typography>
                ))}
                
                {/* Dias do mês */}
                {emptyDays.map((_, index) => (
                  <Box key={`empty-${index}`} sx={{ minHeight: { xs: '60px', sm: '70px', md: '80px' } }} />
                ))}
                {days.map((day: Date) => (
                  <CalendarDay 
                    key={day.toString()} 
                    date={day} 
                    isWorkDay={isWorkDay(day)} 
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
