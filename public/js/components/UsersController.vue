<template>
	<div>
		<custom-popup v-if="actionTargetUser && genSliderPopupIsShown" :shown="genSliderPopupIsShown"
					  @popupClosed="onPopupClose()">
			<template slot="body">
				<div class="form-group">
					<label for="tasksets-list">
						{{signs.choose_taskset}}
					</label>

					<select id="tasksets-list" class="form-control" v-model="selectedTaskSetId">
						<option v-for="taskSet in actionTargetUser.taskSetsOfUserWithMarks" :value="taskSet._id">
							{{taskSet.seqNum}}: {{taskSet.description}}
						</option>
					</select>
				</div>
			</template>

			<template slot="footer">
				<button type="button" class="btn btn-primary" @click="createSlider()">
					{{signs.gen_slider}}
				</button>
			</template>
		</custom-popup>


		<custom-popup v-if="actionTargetUser && openSliderPopupIsShown" :shown="openSliderPopupIsShown"
					  @popupClosed="onPopupClose()">
			<template slot="body">
				<div class="form-group">
					<label for="tasksets-list">
						{{signs.choose_taskset}}
					</label>

					<select id="tasksets-list2" class="form-control" v-model="selectedTaskSetId">
						<option v-for="taskSet in actionTargetUser.taskSetsOfUserWithSliders" :value="taskSet._id">
							{{taskSet.seqNum}}: {{taskSet.description}}
						</option>
					</select>
				</div>
			</template>

			<template slot="footer">
				<button type="button" class="btn btn-primary" @click="openSlider()">
					{{signs.open_slider}}
				</button>
			</template>
		</custom-popup>


		<div v-if="!selectedUser">
			<div class="form-group">
				<button @click.prevent="addUser()" type="button" class="btn btn-primary">
					{{signs.user_add}}
				</button>
			</div>

			<div class="row">
				<table class="table table-striped">
					<thead>
					<tr>
						<th>E-mail</th>
						<th>{{signs.status}}</th>
						<th>{{signs.role}}</th>
						<th>{{signs.actions}}</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="user in users" :class="{
							'text-muted': user.status === 'disabled',
							'text-bold': user.role === 'admin',
						}">
						<td>{{user.email}}</td>
						<td>{{signs['user_statuses.' + user.status]}}</td>
						<td>{{signs['user_roles.' + user.role]}}</td>
						<td>
							<button @click.prevent="editUser(user)" type="button" class="btn btn-warning btn-xs">
								{{signs.edit}}
							</button>

							<button
								@click.prevent="showGenSliderPopup(user)"
								type="button"
								class="btn btn-primary btn-xs create-slider"
								:disabled="!user.taskSetsOfUserWithMarks.length"
								:title="user.taskSetsOfUserWithMarks.length ? '' : signs.slider_creation_error"
							>
								{{signs.gen_slider}}
							</button>

							<button
								@click.prevent="showOpenSliderPopup(user)"
								type="button"
								class="btn btn-success btn-xs"
								:disabled="!user.taskSetsOfUserWithSliders.length"
								:title="user.taskSetsOfUserWithSliders.length ? '' : signs.slider_opening_error"
							>
								{{signs.open_slider}}
							</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>


		<div class="users-form-wrapper" v-if="selectedUser">
			<h1 v-if="selectedUser._id">{{signs.user_edit}}</h1>
			<h1 v-else>{{signs.user_add}}</h1>

			<div class="row users-form">
				<div class="col-xs-6">
					<form autocomplete="off">
						<div class="form-group">
							<label for="email">E-mail</label>
							<input type="email" id="email" class="form-control" v-model="selectedUser.email">
						</div>

						<div class="form-group">
							<label for="pass">{{signs.password}}</label>
							<input type="password" id="pass" class="form-control" v-model="selectedUser.password">
						</div>

						<div class="form-group">
							<label for="status">{{signs.status}}</label>

							<select id="status" class="form-control" v-model="selectedUser.status">
								<option v-for="(value, key) in statuses" :value="key">
									{{signs['user_statuses.' + key]}}
								</option>
							</select>
						</div>

						<div class="form-group">
							<label for="role">{{signs.role}}</label>

							<select id="role" class="form-control" v-model="selectedUser.role">
								<option v-for="(value, key) in roles" :value="key">
									{{signs['user_roles.' + key]}}
								</option>
							</select>
						</div>
					</form>
				</div>
			</div>

			<div class="tasksets-form-controls">
				<button class="btn btn-success" @click.prevent="submitForm()">{{signs.submit}}</button>
				<button class="btn btn-default" @click.prevent="closeForm()">{{signs.cancel}}</button>
			</div>
		</div>
	</div>
</template>


<script>
	/* eslint-disable no-underscore-dangle,no-alert */

	import $ from 'jquery';
	import Request from '../request';

	import CustomPopup from './CustomPopup.vue';

	export default {
		data() {
			return {
				users: window.users,
				roles: window.roles,
				statuses: window.statuses,
				signs: window.signs,

				selectedUser: null,
				localTaskSets: this.taskSets,

				actionTargetUser: null,
				selectedTaskSetId: null,

				genSliderPopupIsShown: false,
				openSliderPopupIsShown: false,
			};
		},

		components: {
			'custom-popup': CustomPopup,
		},

		methods: {
			addUser() {
				this.selectedUser = {
					email: '',
					password: '',
					role: 'admin',
					status: 'active',
				};
			},


			editUser(user) {
				this.selectedUser = $.extend(true, {}, user);
			},


			openSlider() {
				const user = this.actionTargetUser;
				const selectedTaskSetId = this.selectedTaskSetId;

				if (!(user && selectedTaskSetId)) {
					alert(this.signs.select_taskset_error);
					return;
				}

				window.open(`/slider/${user.email}/${selectedTaskSetId}`);
			},


			closeForm() {
				this.selectedUser = null;
			},


			submitForm() {
				const user = this.selectedUser;
				const userId = user._id;

				// Edit user request
				if (userId) {
					Request.post(`/api/config/${userId}/update-user`, {
						data: {user},
					})
						.then(() => window.location.reload())
						.catch(() => alert(this.signs.edit_user_error));

					// Add user request
				} else {
					Request.post('/api/config/add-user', {
						data: {user},
					})
						.then(() => window.location.reload())
						.catch(() => alert(this.signs.add_user_error));
				}
			},


			createSlider() {
				const user = this.actionTargetUser;
				const selectedTaskSetId = this.selectedTaskSetId;

				console.log(2, user, selectedTaskSetId)

				if (!(user && selectedTaskSetId)) {
					alert(this.signs.select_taskset_error);
					return;
				}

				Request.post(`/api/config/${user._id}/create-slider`, {
					data: {
						taskSetId: selectedTaskSetId,
					}
				})
					.then(() => {
						alert(this.signs.slider_created);
						location.reload();
					})
					.catch(err => alert(err.message));
			},


			showGenSliderPopup(user) {
				this.actionTargetUser = user;
				this.selectedTaskSetId = user.taskSetsOfUserWithMarks[0]._id;
				this.genSliderPopupIsShown = true;
			},


			showOpenSliderPopup(user) {
				this.actionTargetUser = user;
				this.selectedTaskSetId = user.taskSetsOfUserWithSliders[0]._id;
				this.openSliderPopupIsShown = true;
			},


			onPopupClose() {
				this.genSliderPopupIsShown = false;
				this.openSliderPopupIsShown = false;
				this.selectedTaskSetId = null;
				this.actionTargetUser = null;
			}
		},
	};
</script>
