import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";

import Input from "../../components/input";

import warningIcon from '../../assets/images/icons/warning.svg'
//import TeacherItem from "../../components/TeacherItem";
import Textarea from "../../components/TextArea";
import Select from "../../components/select";
import api from "../../services/api";
import './styles.css';

function TeacherForm() {
    const history = useHistory();//usado pra naavegação


    //informações do Professor
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    //
    //Informações da Aula
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [ScheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...ScheduleItems,
            { week_day: 0, from: '', to: '' }
        ]);
        ScheduleItems.push();
    }

    function setScheduleItemValue(position: Number, field: string, value: string) {
        const updateSchedule = ScheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        })
        setScheduleItems(updateSchedule);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: ScheduleItems
        }).then(() => {
            alert("Cadastro Realizado com Sucesso!");

            history.push('/');
        }).catch(() => {
            alert("Erro no Cadastro!");
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas!"
                description="O primeiro passo e preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>

                        <Input
                            name="Name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a Aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Física', label: 'Fisíca' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Quimíca', label: 'Quimíca' },

                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua Hora por aula"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend> Horários Disponíveis
                    <button type="button" onClick={addNewScheduleItem}> + Novo Horário</button>
                        </legend>

                        {ScheduleItems.map((ScheduleItem, index) => {
                            return (
                                <div key={ScheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={ScheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda Feira' },
                                            { value: '2', label: 'Terça Feira' },
                                            { value: '3', label: 'Quarta Feira' },
                                            { value: '4', label: 'Quinta Feira' },
                                            { value: '5', label: 'Sexta Feira' },
                                            { value: '6', label: 'Sábado' },

                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={ScheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={ScheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importate <br />
                        Preencha todos os dados!
                    </p>


                        <button type="submit" >
                            Salvar Cadastro
                    </button>
                    </footer>
                </form>
            </main>

        </div>
    )
}

export default TeacherForm;
