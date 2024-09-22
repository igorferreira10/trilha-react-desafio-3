import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';
import { useForm } from "react-hook-form";
import { 
    Container, 
    Title, 
    Column, 
    TitleLogin, 
    SubtitleLogin, 
    Row, 
    Wrapper, 
    EsqueciText 
} from './styles';

const Cadastro = () => {
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const response = await api.post('/users', formData);
            if (response.status === 201) {
                alert('Cadastro realizado com sucesso!');
                navigate('/login');
            }
        } catch (e) {
            alert('Erro ao realizar cadastro. Tente novamente.');
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas empresas mais desejadas.</Title>
                </Column>
                <Column>
                    <Wrapper>
                        <TitleLogin>Faça seu cadastro</TitleLogin>
                        <SubtitleLogin>Preencha os dados abaixo para criar sua conta.</SubtitleLogin>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="Nome" leftIcon={<MdPerson />} name="nome" control={control} />
                            {errors.nome && <span>Nome é obrigatório</span>}
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                            <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
                            {errors.senha && <span>Senha é obrigatória</span>}
                            <Button title="Cadastrar" variant="secondary" type="submit" />
                        </form>
                        <Row>
                            <EsqueciText>Já tem uma conta? Faça login</EsqueciText>
                        </Row>
                    </Wrapper>
                </Column>
            </Container>
        </>
    );
}

export { Cadastro };

