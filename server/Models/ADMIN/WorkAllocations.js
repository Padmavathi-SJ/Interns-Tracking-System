import db from '../../DB/db.js';

export const AllocateWork = async (
  employee_id,
  department_name,
  title,
  description,
  date,
  from_time,
  to_time,
  venue,
  deadline,
  priority,
  created_at,
  status
) => {
  const query = `insert into work_allocation (
                   employee_id, 
                   department_name,
                   title, 
                   description,
                   date,
                   from_time,
                   to_time, 
                   venue,
                   deadline,
                   priority,
                   created_at,
                   status
                 ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const formatDateTimeForMySQL = (date) => {
    const d = new Date(date);
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };

  // ✅ Overwrite the existing `created_at` param with formatted value
  created_at = formatDateTimeForMySQL(created_at);

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        employee_id,
        department_name,
        title,
        description,
        date,
        from_time,
        to_time,
        venue,
        deadline,
        priority,
        created_at,
        status,
      ],
      (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      }
    );
  });
};
