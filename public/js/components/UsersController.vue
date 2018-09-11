<template>
	<div>

    <custom-popup :shown="genSliderPopupIsShown" @popupClosed="onGenSliderPopupClose()">
      <template slot="body">
        <div class="form-group">
          <label for="tasksets-list">
            {{signs.choose_taskset}}
          </label>

          <select id="tasksets-list" class="form-control" v-model="selectedTaskSetId">
            <option :value="null" disabled>
              {{signs.choose_taskset}}
            </option>

            <option v-for="taskSet in localTaskSets" :value="taskSet._id">
              {{taskSet.seqNum}} | {{taskSet.description}}
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
								@click.prevent="openGenSliderPopup(user)"
								type="button"
								class="btn btn-primary btn-xs create-slider"
								:disabled="false"
								:title="user.hasAnswers ? '' : signs.slider_creation_error"
							>
								{{signs.gen_slider}}
							</button>

							<button
								@click.prevent="openSlider(user)"
								type="button"
								class="btn btn-success btn-xs"
								:disabled="false"
								:title="user.hasSlider ? '' : signs.slider_opening_error"
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

        genSliderSelectedUser: null,
        selectedTaskSetId: null,

        genSliderPopupIsShown: false,
			};
		},

    components: {
      'custom-popup': CustomPopup,
    },

    props: ['taskSets'],

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

			openSlider(user) {
				if (! user.hasSlider) {
					return;
				}

				window.location.href = `/slider/${user.email}`;
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
						data: { user },
					})
						.then(() => window.location.reload())
						.catch(() => alert(this.signs.edit_user_error));

					// Add user request
				} else {
					Request.post('/api/config/add-user', {
						data: { user },
					})
						.then(() => window.location.reload())
						.catch(() => alert(this.signs.add_user_error));
				}
			},

			createSlider() {
			  const user = this.genSliderSelectedUser;
			  const selectedTaskSetId = this.selectedTaskSetId;

			  console.log(user, selectedTaskSetId)

			  if (! (user && selectedTaskSetId)) {
			    alert(this.signs.select_taskset_error);
			    return;
        }

				if (! user.hasAnswers) {
					// return;
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

      openGenSliderPopup(user) {
        this.genSliderSelectedUser = user;
        this.genSliderPopupIsShown = true;
      },

      onGenSliderPopupClose() {
			  this.genSliderPopupIsShown = false;
			  this.selectedTaskSetId = null;
			  this.genSliderSelectedUser = null;
      }
		},
	};
</script>
