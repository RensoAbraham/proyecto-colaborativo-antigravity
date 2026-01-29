import { Company, User, WorkSession } from '@/types';
import { addDays, subDays, format } from 'date-fns';

export const MOCK_COMPANY: Company = {
    id: 'comp_123',
    name: 'Tech Solutions Inc.',
    plan: 'pro',
};

export const MOCK_USER: User = {
    id: 'user_123',
    full_name: 'Alex Developer',
    email: 'alex@techsolutions.com',
    role: 'user',
    company_id: 'comp_123',
    avatar_url: 'https://github.com/shadcn.png',
};

const today = new Date();

// Get the start of current month for proper week calculations
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

// Helper to create check_in/check_out times
const createTimes = (date: Date, startHour: number, endHour: number) => {
    const checkIn = new Date(date);
    checkIn.setHours(startHour, 0, 0, 0);
    const checkOut = new Date(date);
    checkOut.setHours(endHour, 0, 0, 0);
    return { check_in: checkIn.toISOString(), check_out: checkOut.toISOString() };
};

// Create dates for the LAST complete week (so all data shows)
// If today is Wed Jan 29, last week was Mon Jan 20 - Fri Jan 24
const getLastWeekDate = (dayIndex: number) => {
    // dayIndex: 0=Monday, 1=Tuesday, etc.
    const lastMonday = subDays(today, today.getDay() === 0 ? 6 : today.getDay() + 6);
    const targetDate = new Date(lastMonday);
    targetDate.setDate(lastMonday.getDate() + dayIndex);
    return targetDate;
};

// Create dates for week 1 of the month (first 5 work days)
const getWeek1Date = (dayIndex: number) => {
    // Start from first Monday of the month or day 1 if it's a weekday
    const firstOfMonth = new Date(currentYear, currentMonth, 1);
    const firstDayOfWeek = firstOfMonth.getDay();
    // Find first Monday (or use day 1 if month starts Mon-Fri)
    let startDate = new Date(firstOfMonth);
    if (firstDayOfWeek === 0) startDate.setDate(2); // Sunday -> Monday
    else if (firstDayOfWeek === 6) startDate.setDate(3); // Saturday -> Monday
    
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + dayIndex);
    return targetDate;
};

// Dates for last complete work week (for bar chart - Lun-Vie)
const mondayDate = getLastWeekDate(0);
const tuesdayDate = getLastWeekDate(1);
const wednesdayDate = getLastWeekDate(2);
const thursdayDate = getLastWeekDate(3);
const fridayDate = getLastWeekDate(4);

// Week 1 dates (first week of month)
const week1Mon = getWeek1Date(0);
const week1Tue = getWeek1Date(1);
const week1Wed = getWeek1Date(2);
const week1Thu = getWeek1Date(3);
const week1Fri = getWeek1Date(4);

// Week 2 dates
const week2Mon = getWeek1Date(7);
const week2Tue = getWeek1Date(8);
const week2Wed = getWeek1Date(9);
const week2Thu = getWeek1Date(10);
const week2Fri = getWeek1Date(11);

// Week 3 dates  
const week3Mon = getWeek1Date(14);
const week3Tue = getWeek1Date(15);
const week3Wed = getWeek1Date(16);

export const MOCK_SESSIONS: WorkSession[] = [
    // LAST COMPLETE WEEK - This shows in the bar chart (Lun-Vie)
    // Matching Dashboard: Lun: 8.5h, Mar: 7.2h, Mie: 9h, Jue: 8h, Vie: 6.5h
    {
        id: 'sess_mon',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(mondayDate, 'yyyy-MM-dd'),
        ...createTimes(mondayDate, 8, 17),
        status: 'completed',
        total_minutes: 510, // 8.5h
        breaks: [{ id: 'b_mon', session_id: 'sess_mon', start_time: '', duration_minutes: 30 }],
    },
    {
        id: 'sess_tue',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(tuesdayDate, 'yyyy-MM-dd'),
        ...createTimes(tuesdayDate, 8, 16),
        status: 'completed',
        total_minutes: 432, // 7.2h
        breaks: [{ id: 'b_tue', session_id: 'sess_tue', start_time: '', duration_minutes: 48 }],
    },
    {
        id: 'sess_wed',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(wednesdayDate, 'yyyy-MM-dd'),
        ...createTimes(wednesdayDate, 8, 18),
        status: 'completed',
        total_minutes: 540, // 9h
        breaks: [{ id: 'b_wed', session_id: 'sess_wed', start_time: '', duration_minutes: 60 }],
    },
    {
        id: 'sess_thu',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(thursdayDate, 'yyyy-MM-dd'),
        ...createTimes(thursdayDate, 8, 17),
        status: 'completed',
        total_minutes: 480, // 8h
        breaks: [],
    },
    {
        id: 'sess_fri',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(fridayDate, 'yyyy-MM-dd'),
        ...createTimes(fridayDate, 9, 16),
        status: 'completed',
        total_minutes: 390, // 6.5h
        breaks: [{ id: 'b_fri', session_id: 'sess_fri', start_time: '', duration_minutes: 30 }],
    },
    
    // WEEK 1 - First week of month (for monthly trend Sem 1)
    {
        id: 'sess_w1_mon',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week1Mon, 'yyyy-MM-dd'),
        ...createTimes(week1Mon, 8, 17),
        status: 'completed',
        total_minutes: 480,
        breaks: [{ id: 'bw1m', session_id: 'sess_w1_mon', start_time: '', duration_minutes: 60 }],
    },
    {
        id: 'sess_w1_tue',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week1Tue, 'yyyy-MM-dd'),
        ...createTimes(week1Tue, 8, 17),
        status: 'completed',
        total_minutes: 510,
        breaks: [],
    },
    {
        id: 'sess_w1_wed',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week1Wed, 'yyyy-MM-dd'),
        ...createTimes(week1Wed, 8, 18),
        status: 'completed',
        total_minutes: 540,
        breaks: [{ id: 'bw1w', session_id: 'sess_w1_wed', start_time: '', duration_minutes: 60 }],
    },
    {
        id: 'sess_w1_thu',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week1Thu, 'yyyy-MM-dd'),
        ...createTimes(week1Thu, 8, 16),
        status: 'completed',
        total_minutes: 420,
        breaks: [],
    },
    {
        id: 'sess_w1_fri',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week1Fri, 'yyyy-MM-dd'),
        ...createTimes(week1Fri, 8, 17),
        status: 'completed',
        total_minutes: 480,
        breaks: [{ id: 'bw1f', session_id: 'sess_w1_fri', start_time: '', duration_minutes: 60 }],
    },
    
    // WEEK 2 (for monthly trend Sem 2)
    {
        id: 'sess_w2_mon',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week2Mon, 'yyyy-MM-dd'),
        ...createTimes(week2Mon, 8, 18),
        status: 'completed',
        total_minutes: 540,
        breaks: [{ id: 'bw2m', session_id: 'sess_w2_mon', start_time: '', duration_minutes: 60 }],
    },
    {
        id: 'sess_w2_tue',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week2Tue, 'yyyy-MM-dd'),
        ...createTimes(week2Tue, 8, 16),
        status: 'completed',
        total_minutes: 450,
        breaks: [],
    },
    {
        id: 'sess_w2_wed',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week2Wed, 'yyyy-MM-dd'),
        ...createTimes(week2Wed, 8, 17),
        status: 'completed',
        total_minutes: 510,
        breaks: [{ id: 'bw2w', session_id: 'sess_w2_wed', start_time: '', duration_minutes: 60 }],
    },
    {
        id: 'sess_w2_thu',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week2Thu, 'yyyy-MM-dd'),
        ...createTimes(week2Thu, 8, 17),
        status: 'completed',
        total_minutes: 480,
        breaks: [],
    },
    {
        id: 'sess_w2_fri',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week2Fri, 'yyyy-MM-dd'),
        ...createTimes(week2Fri, 8, 17),
        status: 'completed',
        total_minutes: 510,
        breaks: [{ id: 'bw2f', session_id: 'sess_w2_fri', start_time: '', duration_minutes: 30 }],
    },
    
    // WEEK 3 (for monthly trend Sem 3)
    {
        id: 'sess_w3_mon',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week3Mon, 'yyyy-MM-dd'),
        ...createTimes(week3Mon, 8, 17),
        status: 'completed',
        total_minutes: 480,
        breaks: [{ id: 'bw3m', session_id: 'sess_w3_mon', start_time: '', duration_minutes: 60 }],
    },
    {
        id: 'sess_w3_tue',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week3Tue, 'yyyy-MM-dd'),
        ...createTimes(week3Tue, 8, 18),
        status: 'completed',
        total_minutes: 540,
        breaks: [],
    },
    {
        id: 'sess_w3_wed',
        user_id: 'user_123',
        company_id: 'comp_123',
        date: format(week3Wed, 'yyyy-MM-dd'),
        ...createTimes(week3Wed, 8, 17),
        status: 'completed',
        total_minutes: 510,
        breaks: [{ id: 'bw3w', session_id: 'sess_w3_wed', start_time: '', duration_minutes: 30 }],
    },
];

export const MOCK_CURRENT_SESSION: WorkSession | null = null; // Start with no active session
