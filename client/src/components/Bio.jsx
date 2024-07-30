import { useState } from 'react';
import { Button, Space, Input, message } from 'antd';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_BIO } from '../utils/mutations'; // Define this mutation in your GraphQL mutations

const { TextArea } = Input;

const BioForm = () => {
  const [updateBio] = useMutation(UPDATE_USER_BIO);
  const [bio, setBio] = useState('');
  console.log('Submitted values:', bio);
  const handleFormSubmit = async () => {
    try {
      const { data } = await updateBio({
        variables: { bio },
      });
      console.log('Update response:', data);
      message.success('Bio updated successfully!');
    } catch (e) {
      console.error('Error updating bio:', e);
      if (e.graphQLErrors) {
        e.graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      }
      if (e.networkError) {
        console.log(`[Network error]: ${e.networkError.message}`);
      }
      message.error('Failed to update bio.');
    }
  };

  return (
    <>
        <Space direction="vertical" size="middle"></Space>
        <Space.Compact
        style={{
            width: '100%',
        }}
        >
        <TextArea
            rows={1}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            onFinish={handleFormSubmit}
            placeholder="Your Bio"
        />
        <Button type="primary" onClick={handleFormSubmit}>
            Submit
        </Button>
        </Space.Compact>
    </>
  );
};

export default BioForm;