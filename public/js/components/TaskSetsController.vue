<template>
  <div>
    <div v-if="!selectedTaskSet">
      <div class="form-group">
        <button @click.prevent="addTaskSet()" type="button" class="btn btn-primary">
          {{signs.add_taskset}}
        </button>
      </div>

      <div class="row">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>№</th>
            <th>{{signs.assessment_limit_short}}</th>
            <th>{{signs.random_selection}}</th>
            <th>{{signs['config_props.cliExport_datasets']}}</th>
            <th>{{signs.active_taskset}}</th>
            <th>{{signs.description}}</th>
            <th>{{signs.actions}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="taskSets.length" v-for="(taskSet, index) in taskSets" :class="{
							'text-muted': !taskSet.isActive,
							'text-bold': taskSet.isActive,
					}">
            <td>{{index + 1}}</td>
            <td>{{taskSet.assessmentLimit}}</td>
            <td>{{booleanToReadableString(taskSet.randomSelection)}}</td>
            <td :title="renderDataSetsList(taskSet.activeDataSets)">
              {{renderActiveDataSetsCellContent(taskSet.activeDataSets)}}</td>
            <td>{{booleanToReadableString(taskSet.isActive)}}
            </td>
            <td>{{taskSet.description || '-'}}</td>
            <td>
              <button @click.prevent="editTaskSet(taskSet)" type="button" class="btn btn-success btn-xs">
                {{signs.edit}}
              </button>

              <button v-if="!taskSet.isActive" @click.prevent="activateTaskSet(taskSet)" type="button" class="btn btn-primary btn-xs">
                {{signs.activate}}
              </button>
            </td>
          </tr>
          <tr v-if="!taskSets.length">
            <td colspan="7" class="no-tasks-cell">{{signs.no_created_tasks}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="users-form-wrapper" v-if="selectedTaskSet">
      <h1 v-if="selectedTaskSet._id">{{signs.edit_taskset}}</h1>
      <h1 v-else>{{signs.add_taskset}}</h1>

      <button class="btn btn-success" @click.prevent="closeForm()">{{signs.cancel}}</button>
      <button class="btn btn-primary" @click.prevent="submitForm()">{{signs.submit}}</button>

      <div class="row tasksets-form">
        <div class="col-xs-6">
          <div autocomplete="off">

            <div class="form-group property">
              <label for="limit">{{signs['config_props.assessment_limit']}}</label>
              <input :disabled="!selectedTaskSet.randomSelection" type="number" id="limit" class="form-control"
                     v-model="selectedTaskSet.assessmentLimit">
            </div>

            <div class="form-check-label property">
              <input
                id="randomSelection"
                class="form-check-input"
                type="checkbox"
                v-model="selectedTaskSet.randomSelection"
              >

              <label for="randomSelection">{{signs['config_props.show_randomly']}}</label>
            </div>

            <div class="form-check-label property">
              <label for="task-set-description">{{signs.description}}</label>

              <textarea
                id="task-set-description"
                class="form-check-input"
                type="checkbox"
                v-model="selectedTaskSet.description"
              ></textarea>
            </div>

            <h5>
              {{this.signs.datasets_for_task}}

              <i @click="setDataSetsStatus(true)" :title="signs.check_all" class="fa fa-check-square-o datasets-control"
                 aria-hidden="true"></i>
              <i @click="setDataSetsStatus(false)" :title="signs.uncheck_all" class="fa fa-square-o datasets-control"
                 aria-hidden="true"></i>
            </h5>

            <div v-if="selectedTaskSet.dataSets.length" class="datasets-container property">
              <div class="form-check-label dataset-item" v-for="(dataset, index) in selectedTaskSet.dataSets">
                <input
                  :id="index"
                  class="form-check-input"
                  type="checkbox"
                  v-model="dataset.isInTaskSet"
                  :disabled="!dataset.canBeChanged"
                >

                <label :title="dataset.canBeChanged ? '' : signs.disabled_dataset_reason" :for="index">{{dataset._id}}</label>
              </div>
            </div>

            <div v-else>
              {{window.signs.no_datasets}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-underscore-dangle,no-alert */

  import $ from 'jquery';
  import Request from '../request';


  const SHOWN_DATASETS_COUNT = 2;


  export default {
    props: ['taskSets', 'dataSets'],

    data() {
      return {
        signs: window.signs,
        selectedTaskSet: null,
      };
    },

    methods: {
      addTaskSet() {
        const blankTaskSet = {
          assessmentLimit: 0,
          randomSelection: true,
          description: '',
          activeDataSets: [],
        };

        blankTaskSet.dataSets = this.dataSets
          .map((dataSet) => {
            const dataSetClone = $.extend(true, {}, dataSet);

            // Dataset is active in current task set
            dataSetClone.isInTaskSet = true;

            // All data sets can be activated/deactivated
            dataSetClone.canBeChanged = true;

            return dataSetClone;
          });

        this.selectedTaskSet = blankTaskSet;
      },


      editTaskSet(taskSet) {
        this.selectedTaskSet = $.extend({}, taskSet);
      },


      closeForm() {
        this.selectedTaskSet = null;
      },


      submitForm() {
        const taskSet = this.selectedTaskSet;
        const taskSetId = taskSet._id;

        const url = taskSetId
          ? '/api/config/edit-taskset'
          : '/api/config/add-taskset';

        Request.post(url, {
          data: {taskSet}
        })
          .then(() => window.location.reload())
          .catch(error => alert(error));
      },


      booleanToReadableString(boolean) {
        return boolean ? this.signs.yes : this.signs.no;
      },


      setDataSetsStatus(state) {
        if (!this.selectedTaskSet) {
          return;
        }

        this.selectedTaskSet.dataSets
          .filter(dataSet => dataSet.canBeChanged)
          .forEach((dataSet) => {
            dataSet.isInTaskSet = state;
          });
      },


      renderActiveDataSetsCellContent(activeDataSets) {
        if (!activeDataSets.length) {
          return '-';
        }

        const shownDataSets = activeDataSets.slice(0, SHOWN_DATASETS_COUNT);

        let cellContent = shownDataSets.join(', ');

        const notShownDataSetsLength = activeDataSets.length - shownDataSets.length;

        if (notShownDataSetsLength) {
          cellContent += ` ${this.signs.and_more_datasets.replace('%s', notShownDataSetsLength)}`;
        }

        return cellContent;
      },


      activateTaskSet(taskSet) {
        Request.post('/api/config/activate', {
          data: {taskSet},
        })
          .then(() => window.location.reload())
          .catch(() => alert(this.signs.taskset_activation_error));
      },


      renderDataSetsList(dataSetsList) {
        return dataSetsList.length > SHOWN_DATASETS_COUNT + 1
          ? dataSetsList.join(', ')
          : '';
      },
    },
  };
</script>
