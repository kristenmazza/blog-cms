import { Container, Toolbar } from '@mui/material';
import Tiptap from '../components/TipTap';

export default function EditPost() {
  return (
    <Container maxWidth='lg'>
      <Toolbar sx={{ height: '8rem' }} />
      <Tiptap />
    </Container>
  );
}
