import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const mockDates = [
    { startDate: '2022-10-20T09:00', endDate: '2022-10-20T10:00', title: 'Prueba' }
];

const HorarioTalleres = () => {
    return (
        <div id="calendar">
            <Scheduler data={mockDates}>
                <ViewState />
                <EditingState />
                <IntegratedEditing />
                <WeekView startDayHour={8} endDayHour={20}/>
                <Appointments />
                <AppointmentForm />
            </Scheduler>
        </div>
    )
}

export default HorarioTalleres;