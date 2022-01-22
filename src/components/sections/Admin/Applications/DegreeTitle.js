import React, { useState } from 'react';
import {
	Flex,
	Text,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	FormHelperText,
	Divider,
	Select,
	RadioGroup,
	Stack,
	Button,
	Radio,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import countries from '../../../../data/form/countries.json';
import universities from '../../../../data/form/universities.json';
import 'animate.css';

const DegreeTitle = ({ status }) => {
	const [studyCountry, setStudyCountry] = useState('GR');

	return (
		<Flex
			flexDir={'column'}
			px={'50px'}
			bgColor={'#fcfcfc'}
			pb={'50px'}
			className='animate__animated animate__fadeIn '
			transition={'all 0.3s ease-in-out'}
			flex={1}
			display={status !== 'degree-title' && 'none'}>
			<Divider h={'2px'} bgColor={'gray.300'} mb={'20px'} />
			{/* <Text fontSize={'18x'} fontWeight={'500'}>
							Συμπληρώστε τα στοιχεία του Τίτλου Σπουδών προς αναγνώριση με κεφαλαίους
							χαρακτήρες
						</Text> */}
			<Flex gap={10}>
				<Flex w={'20%'}>
					<Field name='degreeType'>
						{({ field, form }) => (
							<FormControl
								isInvalid={form.errors.degreeType && form.touched.degreeType}
								mt={'20px'}>
								<FormLabel htmlFor='degreeType'>Τύπος Πανεπιστημίου Ισοτιμίας</FormLabel>
								<Input {...field} id='degreeType' readOnly>
									<option value='Πανεπιστήμιο'>Πανεπιστήμιο</option>
									<option value='ΤΕΙ'>ΤΕΙ</option>
								</Input>
								<FormErrorMessage>{form.errors.degreeType}</FormErrorMessage>
							</FormControl>
						)}
					</Field>
				</Flex>
			</Flex>
			<Divider my={'10px'} h={'2px'} bgColor={'gray.300'} />
			<Text fontWeight={'500'} fontSize={'18px'}>
				Στοιχεία Τίτλου προς αναγνώριση
			</Text>

			<Text my={'10px'} fontSize={'18px'} fontWeight={'500'}>
				Επιλέξτε Χώρα για να δείτε τα σχετικά Πανεπιστήμια
			</Text>
			<Flex w={'50%'}>
				<Field name={'studyCountry'}>
					{({ field, form }) => (
						<FormControl
							isInvalid={form.errors.studyCountry && form.touched.studyCountry}
							mt={'20px'}>
							<FormLabel htmlFor='studyCountry'>Χώρα Φοίτησης</FormLabel>
							<Select
								{...field}
								id='studyCountry'
								value={studyCountry}
								onChange={(e) => setStudyCountry(e.target.value)}
								placeholder='Επιλέξτε Χώρα Σπουδών'>
								{countries.map((country, index) => (
									<option key={index} value={country.code}>
										{country.name}
									</option>
								))}
							</Select>
							<FormErrorMessage>{form.errors.studyCountry}</FormErrorMessage>
						</FormControl>
					)}
				</Field>
			</Flex>
			<Flex w={'50%'}>
				<Field name={'studyCountryUni'}>
					{({ field, form }) => (
						<FormControl
							isInvalid={form.errors.studyCountryUni && form.touched.studyCountryUni}
							mt={'20px'}>
							<FormLabel htmlFor='studyCountryUni'>Πανεπιστήμιο Φοίτησης</FormLabel>
							<Select
								{...field}
								id='studyCountryUni'
								placeholder='Επιλέξτε Πανεπιστήμιο Φοίτησης'>
								{universities
									.filter((uni) => uni.alpha_two_code === studyCountry)
									.map((uni, index) => (
										<option key={index} value={uni.name}>
											{uni.name}
										</option>
									))}
							</Select>
							<FormErrorMessage>{form.errors.studyCountryUni}</FormErrorMessage>
						</FormControl>
					)}
				</Field>
			</Flex>
			<Flex w={'50%'}>
				<Field name={'studyTitle'}>
					{({ field, form }) => (
						<FormControl
							isInvalid={form.errors.studyTitle && form.touched.studyTitle}
							mt={'20px'}>
							<FormLabel htmlFor='studyTitle'>Τίτλος Σπουδών</FormLabel>
							<Input readOnly {...field} id='studyTitle' placeholder='Εισάγετε Τίτλο Σπουδών' />
							<FormErrorMessage>{form.errors.studyTitle}</FormErrorMessage>
						</FormControl>
					)}
				</Field>
			</Flex>
			<Flex w={'40%'}>
				<Field name={'studyCredits'}>
					{({ field, form }) => (
						<FormControl
							isInvalid={form.errors.studyCredits && form.touched.studyCredits}
							mt={'20px'}>
							<FormLabel htmlFor='studyCredits'>Πιστωτικές Μονάδες (credits)</FormLabel>
							<Input
								readOnly
								{...field}
								id='studyCredits'
								placeholder='Εισάγετε Πιστωτικές Μονάδες (credits)'
							/>
							<FormErrorMessage>{form.errors.studyCredits}</FormErrorMessage>
						</FormControl>
					)}
				</Field>
			</Flex>
			<Flex w={'50%'} gap={'4'}>
				<Field name={'studyStartDate'}>
					{({ field, form }) => (
						<FormControl
							isInvalid={form.errors.studyStartDate && form.touched.studyStartDate}
							mt={'20px'}>
							<FormLabel htmlFor='studyStartDate'>Ημερομηνία Εγγραφής</FormLabel>
							<Input
								readOnly
								{...field}
								type='date'
								id='studyStartDate'
								placeholder='Εισάγετε Ημερομηνία Εγγραφής'
							/>
							<FormErrorMessage>{form.errors.studyStartDate}</FormErrorMessage>
						</FormControl>
					)}
				</Field>
				<Field name={'studyEndDate'}>
					{({ field, form }) => (
						<FormControl
							isInvalid={form.errors.studyEndDate && form.touched.studyEndDate}
							mt={'20px'}>
							<FormLabel htmlFor='studyEndDate'>Ημερομηνία Αποφοίτησης</FormLabel>
							<Input
								readOnly
								{...field}
								type='date'
								id='studyEndDate'
								placeholder='Εισάγετε Ημερομηνία Αποφοίτησης'
							/>
							<FormErrorMessage>{form.errors.studyEndDate}</FormErrorMessage>
						</FormControl>
					)}
				</Field>
			</Flex>
			<Flex w={'50%'}>
				<Field name={'studyDuration'}>
					{({ field, form }) => (
						<FormControl
							isInvalid={form.errors.studyDuration && form.touched.studyDuration}
							mt={'20px'}>
							<FormLabel htmlFor='studyDuration'>Διάρκεια Σπουδών</FormLabel>
							<Select {...field} id='studyDuration' placeholder='Επιλέξτε Έτη Σπουδών'>
								<option value='1'>1</option>
								<option value='2'>2</option>
								<option value='3'>3</option>
								<option value='4'>4</option>
								<option value='5'>5</option>
								<option value='6'>6</option>
							</Select>
							<FormErrorMessage>{form.errors.studyDuration}</FormErrorMessage>
						</FormControl>
					)}
				</Field>
			</Flex>
			<Flex mt={'50px'} justifyContent={'right'} gap={4}>
				<Button colorScheme={'blue'} rounded={'md'}>
					Προσωρινή Αποθήκευση
				</Button>
			</Flex>
		</Flex>
	);
};

export default DegreeTitle;
