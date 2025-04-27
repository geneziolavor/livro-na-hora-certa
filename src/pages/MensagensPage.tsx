
import React from 'react';
import StudentMessageForm from '@/components/StudentMessageForm';
import PageTitle from '@/components/layout/PageTitle';

const MensagensPage = () => {
  return (
    <div>
      <PageTitle title="Mensagens" />
      <StudentMessageForm />
    </div>
  );
};

export default MensagensPage;
