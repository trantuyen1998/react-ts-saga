import React, { ReactElement, useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import {ChevronLeft} from '@material-ui/icons'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Student } from 'models';
import studentApi from 'api/studentApi';
interface Props {
    
}

export default function AddEditPage({}: Props): ReactElement {
    const history = useHistory();
    const { studentId } = useParams<{ studentId: string }>();
    const isEdit = Boolean(studentId);
    const [student, setStudent] = useState<Student>();
    useEffect(() => {
      if (!studentId) return;
  
      // IFFE
      (async () => {
        try {
          const data: Student = await studentApi.getStudentById(studentId);
          setStudent(data);
        } catch (error) {
          console.log('Failed to fetch student details', error);
        }
      })();
    }, [studentId]);
    return (
        <Box>
        <Link to="/admin/students">
          <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
            <ChevronLeft /> Back to student list
          </Typography>
        </Link>
  
        <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>
  
        {/* {(!isEdit || Boolean(student)) && (
          <Box mt={3}>
            <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
          </Box>
        )} */}
      </Box>
    )
}
