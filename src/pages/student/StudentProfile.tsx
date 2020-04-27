import React, { useState, useEffect } from 'react';
import { Grid, Divider, makeStyles, Typography } from '@material-ui/core';
import { compareAsc, parse } from 'date-fns';

import Modal from 'components/modal';
import Icons from 'components/icons';
import { getStudentProfile } from './Student.service';
import {
  StudentCardProps,
  StudentBookHistoryProps,
  StudentProfileProps,
  StudentModel
} from './Student.type';
import { GetStudentBooksHistoryModel } from 'pages/books/Book.type';
import { useAlert } from 'utils/snackbarAlerts';

const cardWidth = 680;

const cardCfg = {
  container: {
    height: 345,
    width: cardWidth
  },
  overlayCard: {
    height: 375,
    width: cardWidth - 15 - 215
  },
  image: {
    width: 245
  }
};

const useStyles = makeStyles(theme => ({
  container: {
    width: 680,
    position: 'relative',
    height: 345
  },
  backgroundSetting: {
    position: 'absolute',
    height: cardCfg.container.height,
    width: cardCfg.container.width,
    top: -15,
    left: -15,
    borderTopLeftRadius: theme.shape.borderRadius,
    background: `linear-gradient(to top, white 15px, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 85%, ${theme.palette.primary.dark})`
  },
  studentProfileImage: {
    backgroundColor: theme.palette.primary.light,
    height: cardCfg.overlayCard.height,
    width: cardCfg.image.width,
    position: 'absolute',
    right: -30,
    top: 0,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius
  },
  studentPreImage: {
    color: 'darkgray',
    fontSize: 180
  },
  profileDataContainer: {
    height: cardCfg.overlayCard.height,
    width: cardCfg.overlayCard.width,
    backgroundColor: 'white',
    marginLeft: 15,
    padding: 15,
    overflowY: 'auto'
  },
  studentHistory: {
    position: 'absolute',
    left: 0,
    top: -65,
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    color: 'white',
    height: 50,
    boxShadow: 'black 1px 3px 4px',
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius
  },
  historySplit: {
    width: '50%'
  },
  fullWidth: {
    width: '100%'
  }
}));

export default ({ open, handleClose, studentId = 1 }: StudentProfileProps) => {
  const alert = useAlert();
  const [isFront, setIsFront] = useState(true);
  const [historyData, setHistoryData] = useState<GetStudentBooksHistoryModel[]>(
    []
  );
  const [studentData, setStudentData] = useState<StudentModel | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const { result, message } = await getStudentProfile(studentId);
      if (message) alert.error(message);
      setStudentData(result!.studentData! || []);
      setHistoryData(result!.historyData || []);
    })();
  }, [studentId]);

  const classes = useStyles();

  return (
    <Modal open={open} handleClose={handleClose}>
      <div className={classes.container}>
        <div
          className={classes.studentHistory}
          onClick={() => setIsFront(!isFront)}
        >
          {Icons.History}
        </div>
        <Grid container className={classes.backgroundSetting}>
          <div className={classes.profileDataContainer}>
            {isFront ? (
              <StudentCard
                studentData={studentData}
                historyData={historyData}
              />
            ) : (
              <BooksHistory
                studentData={studentData!}
                historyData={historyData}
              />
            )}
          </div>
          <Grid
            container
            item
            justify="center"
            alignItems="center"
            className={classes.studentProfileImage}
          >
            <div className={classes.studentPreImage}>{Icons.Student}</div>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

const BooksHistory = ({ historyData, studentData }: StudentCardProps) => {
  const classes = useStyles();
  return (
    <Grid container alignContent="space-between" style={{ height: '100%' }}>
      <Grid item>
        <Typography variant="h5">
          {studentData?.first_name ?? ''} {studentData?.last_name ?? ''}{' '}
          {'Book history'}
        </Typography>
        <Divider></Divider>
      </Grid>
      {historyData?.map(
        (
          { book_name, author_name, check_out_date, check_in_date, return_on },
          index
        ) => {
          return (
            <div key={`${book_name}${check_out_date}${index}`}>
              <Grid item container>
                <Typography variant="body1" className={classes.fullWidth}>
                  Book: {book_name}
                </Typography>
                <Typography variant="body1" className={classes.historySplit}>
                  Author: {author_name}
                </Typography>
                <Typography variant="body1" className={classes.historySplit}>
                  Check out: {check_out_date}
                </Typography>
                <Typography variant="body1" className={classes.historySplit}>
                  Check in: {check_in_date || 'Not returned'}
                </Typography>
                <Typography variant="body1" className={classes.historySplit}>
                  Returned on: {return_on}
                </Typography>
              </Grid>
              <Divider className={classes.fullWidth}></Divider>
            </div>
          );
        }
      )}
    </Grid>
  );
};

const defaultStudentData: StudentModel = {
  student_id: 0,
  birthdate: '',
  class_name: '',
  father_email: '',
  father_mobile: '',
  father_name: '',
  first_name: '',
  grade: 0,
  last_name: '',
  mother_email: '',
  mother_mobile: '',
  mother_name: ''
};

const StudentCard = ({
  studentData = defaultStudentData,
  historyData
}: StudentCardProps) => {
  const {
    first_name,
    last_name,
    birthdate,
    mother_mobile,
    mother_email,
    mother_name,
    father_name,
    father_mobile,
    father_email,
    grade,
    class_name
  } = studentData;

  return (
    <Grid container alignContent="space-between" style={{ height: '100%' }}>
      <Grid item>
        <Typography variant="h5">
          {first_name} {last_name}
        </Typography>
        <Divider></Divider>
      </Grid>

      <Grid container item>
        <Grid item sm={6}>
          <Typography variant="body1">Birthday: {birthdate}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">
            Grade: {grade} {class_name}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item sm={12}>
        <Grid item sm={12}>
          <Typography variant="h5">Mother</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">{mother_name}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">{mother_mobile}</Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography variant="body1">
            <a href={`mailto:${{ mother_email }}`}>{mother_email}</a>
          </Typography>
        </Grid>
      </Grid>
      <Grid container item sm={12}>
        <Grid item sm={12}>
          <Typography variant="h5">Father</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">{father_name}</Typography>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="body1">{father_mobile}</Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography variant="body1">
            <a href={`mailto:${father_email}`}>{father_email}</a>
          </Typography>
        </Grid>
      </Grid>

      <Grid container item sm={12}>
        <Grid item sm={12}>
          <Typography variant="h5">Next books due</Typography>
        </Grid>
        <StudentBookHistory hst={historyData} />
      </Grid>
    </Grid>
  );
};

const StudentBookHistory = ({ hst }: StudentBookHistoryProps): JSX.Element => {
  const newBooks = hst!
    .filter(i => i.check_in_date == null)
    .sort((a, b) => {
      const dateFormat = 'dd MMM yyyy';
      const dateA = parse(a.return_on.toString(), dateFormat, new Date());
      const dateB = parse(b.return_on.toString(), dateFormat, new Date());
      return compareAsc(dateA, dateB);
    })
    .slice(0, 2);

  return (
    <>
      {newBooks.map(({ book_name, author_name, return_on }, index) => {
        return (
          <React.Fragment key={`${book_name}${index}`}>
            <Grid item sm={8}>
              <Typography variant="body1">
                {book_name} - {author_name}
              </Typography>
            </Grid>
            <Grid item sm={4}>
              <Typography variant="body1" align="right">
                Due: {return_on}
              </Typography>
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );
};
