import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import "./stype.scss"
const SearchHotel = () => {
    const [value, setValue] = useState<string | null>("")
    console.log(value)

    return (
        <div className='w-full  bg-[#00AFDD] pt-6 pb-36'>
            <div className="max-w-[1024px] py-5 px-8 mx-40">
                <form action="" className='flex gap-2'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                            <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
                            <DatePicker
                                label="Controlled picker"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
                                className="text-white custom-date-picker-icon "
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </form>

            </div>

        </div>
    )
}

export default SearchHotel