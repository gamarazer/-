package com.equipmenttype.service;

import java.util.List;
import com.equipmenttype.dao.EquipmentTypeDao;
import com.equipmenttype.vo.EquipmentType;
import com.util.PageBean;


public class EquipmentTypeService {
	
	//ע��Dao
	private EquipmentTypeDao equipmenttypeDao;

	public void setEquipmenttypeDao(EquipmentTypeDao equipmenttypeDao) {
		this.equipmenttypeDao = equipmenttypeDao;
	}
	//��ѯ�����豸����
	public List<EquipmentType> findAll() {
		return equipmenttypeDao.findAll();
	}
	//�����û�id��ѯ
	public List<EquipmentType> findByUserId(Integer id) {
		return equipmenttypeDao.findByUserId(id);
	}
	
	// ���豸��������ѯ�û�
	public EquipmentType findByName(String name){
		return equipmenttypeDao.findByName(name);
	}
	//ɾ���豸
	public void delete(EquipmentType exist) {
		equipmenttypeDao.delete(exist);
	}
	
	//��ҳ��ѯ
	public PageBean<EquipmentType> findByPage(int page) {
		PageBean<EquipmentType> pageBean = new PageBean<EquipmentType>();
		// ���õ�ǰҳ��:
		pageBean.setPage(page);
		// ����ÿҳ��ʾ��¼��:
		int limit = 9;
		pageBean.setLimit(limit);
		// �����ܼ�¼��:
		int totalCount = 0;
		totalCount = equipmenttypeDao.findCount();
		pageBean.setTotalCount(totalCount);
		// ������ҳ��
		int totalPage = 0;
		// Math.ceil(totalCount / limit);
		if (totalCount % limit == 0) {
			totalPage = totalCount / limit;
		} else {
			totalPage = totalCount / limit + 1;
		}
		pageBean.setTotalPage(totalPage);
		// ÿҳ��ʾ�����ݼ���
		int begin = (page - 1) * limit;
		List<EquipmentType> list = equipmenttypeDao.findByPage(begin, limit);
		pageBean.setList(list);
		return pageBean;
	}
}
