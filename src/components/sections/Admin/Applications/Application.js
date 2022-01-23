import React, { useEffect, useState } from 'react';
import { Flex, Table, Tr, Tbody, Text, Td, Button } from '@chakra-ui/react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { approveApplication, rejectApplication } from '../../../../actions/admin/admin';
import { useSelector, useDispatch } from 'react-redux';

const Application = ({ application }) => {
	let { createdAt, updatedAt, firstName, lastName, status, _id: id } = application;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { approve, reject } = useSelector((state) => state.admin);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const handleReject = () => {
		setHasSubmitted(true);
		dispatch(rejectApplication(id));
	};

	const handleApprove = () => {
		setHasSubmitted(true);
		dispatch(approveApplication(id));
	};

	useEffect(() => {
		if (!approve.isLoading) {
			setHasSubmitted(false);
		}
	}, [approve]);
	useEffect(() => {
		if (!reject.isLoading) {
			setHasSubmitted(false);
		}
	}, [reject]);

	const renderStatus = () => {
		switch (status) {
			case 1:
				return (
					<Text fontWeight={'500'} color={'blue'} p={'5px'} rounded={'md'}>
						Εκκρεμεί επεξεργασία απο διαχειριστή
					</Text>
				);
			case 2:
				return (
					<Text fontWeight={'500'} color={'green'} p={'5px'} rounded={'md'}>
						Εγκρίθηκε
					</Text>
				);
			case 3:
				return (
					<Text fontWeight={'500'} color={'red'} p={'5px'} rounded={'md'}>
						Απορρίφθηκε
					</Text>
				);
			case 4:
				return (
					<Text fontWeight={'500'} color={'orange'} p={'5px'} rounded={'md'}>
						Αναμονή για ενημέρωση απο χρήστη
					</Text>
				);

			default:
				return (
					<Text fontWeight={'500'} color={'gray'} p={'5px'} rounded={'md'}>
						Δεν υπάρχει κατάσταση
					</Text>
				);
		}
	};
	return (
		<Tr
			cursor={'pointer'}
			onClick={() => navigate(`/admin/applications/${id}`)}
			_hover={{
				bgColor: 'gray.100',
			}}>
			<Td>{id}</Td>
			<Td>{new Date(createdAt).toDateString()}</Td>
			<Td>{new Date(updatedAt).toDateString()}</Td>
			<Td>
				{firstName} {lastName}
			</Td>
			<Td>{renderStatus()}</Td>
			<Td>
				<Flex justifyContent={'end'} gap={4} alignItems={'center'}>
					<MdOutlineOpenInNew
						size={'1.5em'}
						cursor={'pointer'}
						onClick={() => navigate(`/admin/applications/${id}`)}
					/>
					<Button
						colorScheme={'green'}
						onClick={handleApprove}
						isDisabled={status === 2}
						isLoading={approve.isLoading}>
						<Text>Έγκριση</Text>
					</Button>
					<Button
						colorScheme={'red'}
						onClick={handleReject}
						isLoading={reject.isLoading}
						isDisabled={status === 3}>
						<Text>Απόρριψη</Text>
					</Button>
				</Flex>
			</Td>
		</Tr>
	);
};

export default Application;
