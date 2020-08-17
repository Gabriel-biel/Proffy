import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";

import "./styles.css";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/input";
import Select from "../../components/select";
import api from "../../services/api";



function TeacherList() {
    //Lista de profys
    const [teachers, setTeachers] = useState([]);

    //iniciando estado da lista de proffys
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();
        const response = await api.get('classes',  {
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}//linha informando o valo atua da subject ou a materia do proffy
                        onChange={e => { setSubject(e.target.value)}}//Alterando a subject atual
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: '6', label: 'Fisíca' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Quimíca', label: 'Quimíca' },

                        ]}
                    />

                    <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}//Informando o week_day atual presente no estado informado acima
                        onChange={e => { setWeek_day(e.target.value)}}//alterando o week_day atual
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
                        type="time" 
                        name="time" 
                        label="Hora" 
                        value={time}//informado o time atual. Horaio de trabalho do proffy atual, que se inicia em null
                        onChange={e => { setTime(e.target.value)}}//alterado o horario de trabalho do proffy
                    />
                    
                    <button type="submit" >
                        Buscar
                    </button>

                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    )
}

export default TeacherList;