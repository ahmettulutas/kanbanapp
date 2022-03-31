import { Avatar, AvatarGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import { selectAuth, selectToken } from '../../auth/AuthSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addComment, deleteComment } from './CardSlice';
import { getRandomColor } from './cardsStyling';
import { Box } from '@mui/system';

const useStyles = makeStyles ({
    root:{
        display:'flex', 
        width:"100%",
        flexDirection:"column",
        padding:"1rem 0",
    },
    addButton: {
        width:"30%",
        position:"absolute",
        bottom:"0",
        margin:"0.6rem",
        left:"0",
        height:"30px",
        color:'white',
        backgroundColor:'#1572A1',
        border:"none",
        '&:disabled': {
            backgroundColor:'lightgray',
        }
    },
    form: {
        position:"relative",
        width:"100%",
        backgroundColor:"white",
    },
    commentList: {
        display:'flex',
        flexDirection:'column',
        padding:"1rem 0",
        maxHeight:"200px",
        overflow:"scroll"
    },
    commentContainer:{
        display:"flex",
        alignItems:"flex-start",
        gap:5,
    },
    avatar: {
        color:"rgb(21,50,83)", 
        fontWeight:'bold',
        height:'25px',
        width:'25px',
        padding:'4px',
        backgroundColor:"#00A3BF"
    },
    commentText: {
        display:"flex",
        flexDirection:"column",
        width:"100%",
    },
    deleteButton: {
        '&:hover':{
            color:'red',
        },
        cursor:"pointer", 
        margin:"0 0 0 auto", 
        fontSize:"13px", 
        textDecoration:"underline"
    },
})
export default function CardComments({card}:any) {
    const {userName} = useSelector(selectAuth);
    const dispatch = useDispatch<AppDispatch>();
    const [cmmntEditMode, setCmmntEditMode] = useState(false);
    const [newComment, setNewComment] = useState('');
    const commentStyles = useStyles();
    const handleAddComment = (e:any) => {
        e.preventDefault();
        if(newComment.length > 0) {
            dispatch(addComment({listId:card.listId, cardId:card.id, message:newComment}));
            setNewComment('');
        }
        else {
            alert('Please enter a comment');
        }
    }
    return (
        <Box className={commentStyles.root}>
            <Box sx={{display:"flex", alignItems:"flex-start", gap:0.5, flexDirection:'row'}}>
                <Avatar className={commentStyles.avatar} alt='user' >{userName[0].toUpperCase()}</Avatar>
                <form className={commentStyles.form} onSubmit={handleAddComment}>
                    <TextField 
                        value={newComment}
                        label="Add Comment" 
                        fullWidth
                        multiline
                        rows={3}
                        onChange={(e:any) => setNewComment(e.target.value)}
                        onBlur={() => setCmmntEditMode(false)} 
                        onFocus={() => setCmmntEditMode(!cmmntEditMode)} 
                    />
                    {cmmntEditMode && 
                    <button 
                        disabled={newComment.length === 0}
                        className={commentStyles.addButton}
                        onMouseDown={handleAddComment}
                    >Add</button>
                    }
                </form>
            </Box>
            <Box className={commentStyles.commentList}>
                {card.comments.map((comment:any) => (
                    <Box className={commentStyles.commentContainer} key={comment.id}>
                        <Avatar className={commentStyles.avatar}>{comment.author.username[0].toUpperCase()}</Avatar>
                        <div className={commentStyles.commentText}>
                            <Typography sx={{fontWeight:"bold"}}>{comment.author.username}</Typography>
                            <Typography sx={{borderRadius:"5px", fontSize:"13px", p:1,backgroundColor:"white", border:"2px solid #ccc"}}>{comment.message}</Typography>
                            <p className={commentStyles.deleteButton} onClick={() => dispatch(deleteComment({listId:card.listId, comment:comment}))}>Delete</p>
                        </div>
                    </Box>
                ))}
            </Box>
        </Box>
  )
}
