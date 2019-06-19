import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CompanyService} from '../../../core/biz-services/company/company.service';
import {UfastTableNs} from '../../../layout/layout.module';
import {ActionCode} from '../../../../environments/actionCode';
import {UfTableNavNs} from '../../../component/platform-common/ufast-table-nav/ufast-table-nav.component';
import {ShowMessageService} from '../../../widget/show-message/show-message';
import {UfastUtilService} from '../../../core/infra/ufast-util.service';

enum PageType {
  List,
  Add,
  Edit,
  Detail
}


@Component({
  selector: 'app-<%= dasherize(secondlevel) %>',
  templateUrl: './<%= dasherize(secondlevel) %>.component.html',
  styleUrls: ['./<%= dasherize(secondlevel) %>.component.scss']
})
export class <%= classify(secondlevel) %>Component implements OnInit {
  @ViewChild('operationTpl') operationTpl: TemplateRef<any>;
  btnGroupParam: UfTableNavNs.BtnGroupParam;
  tableConfig: UfastTableNs.TableConfig;
  dataList: any[];
  currentPage: number;
  pageType = PageType;
  itemId: string; // 编辑时选中的没条项目的id
  filters: any;
  ActionCode = ActionCode;
  selectedItemList: string[];

  constructor(private dataService: CompanyService, private messageService: ShowMessageService, private utilService: UfastUtilService) {
    this.dataList = [];
    this.currentPage = this.pageType.List;
    this.filters = {};
    this.itemId = '';
    this.btnGroupParam = {
      show: true,
      refresh: {show: true},
      import: {show: true, importUrl: ''},
      export: {show: true, exportUrl: ''}
    };
    this.selectedItemList = [];

  }

  async getDataList (pageNum?: number) {
    const params = {
      pageNum: pageNum || this.tableConfig.pageNum,
      pageSize: this.tableConfig.pageSize,
      filters: {
        orgName: this.filters.orgName
      }
    };

    const {total, list} = await this.dataService.getComponentList(params);
    this.tableConfig.total = total;
    this.tableConfig.checkAll = false;
    this.selectedItemList.length = 0;
    this.dataList = list || [];
  }

  // 清空搜索条件
public resetSearch() {
    this.filters.orgName = '';
    this.getDataList();
  }

private initTable(): void {
    this.tableConfig = {
      pageSize: 10,
      pageNum: 1,
      showCheckbox: true,
      checkRowField: '_checked',
      showPagination: true,
      checkAll: false,
      total: 0,
      loading: false,
      headers: [
        {
          title: '备注',
          width: 100,
          field: 'remark',
        },
        {
          title: '状态',
          width: 100,
          field: 'status',
          pipe: 'companyStatus'
        },
        {
          title: '创建时间',
          width: 100,
          field: 'createDate',
          pipe: 'date:y-MM-dd'
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 150
        }
      ]
    };
}

  // 新增
  add() {
    this.itemId = '';
    this.currentPage = this.pageType.Add;
  }

    // 有id为单个删除，没有id为批量删除
  public batchDel(id?: string) {
    if (this.selectedItemList.length === 0 && !id) {
        this.messageService.showAlertMessage('', '请勾选要删除的数据', 'info');
        return;
    }
    const param: string[] = id ? [id] : this.selectedItemList;
    this.messageService.showAlertMessage('', '确定要删除吗?', 'confirm').afterClose.subscribe((type: string) => {
        if (type !== 'onOk') {
            return;
        }
        // todo
        this.dataService.changeStatus(param).then((res) => {
            this.getDataList();
        });
    });
  }


  // 返回列表
  returnToList(refreshConfig?: { refresh: boolean, pageNum: string }) {
    this.currentPage = this.pageType.List;
    if (refreshConfig.refresh) {
      if (+refreshConfig.pageNum) {
        this.tableConfig.pageNum = +refreshConfig.pageNum;
      }
      this.getDataList();
    }
  }

  edit(orgId) {
    this.itemId = orgId;
    this.currentPage = this.pageType.Edit;
  }

  // 详情
  goDetail(id) {
    this.itemId = id;
    this.currentPage = this.pageType.Detail;
  }

  /*选中复选框,selectedItemList保存所有选中的orgId数组*/
  public checkTableItem(event: UfastTableNs.SelectedChange): void {
      this.selectedItemList = this.utilService.getSelectIds(event, this.selectedItemList, this.tableConfig, this.dataList, 'orgId');
  }

  ngOnInit() {
    this.initTable();
    this.getDataList(1);
  }
}
